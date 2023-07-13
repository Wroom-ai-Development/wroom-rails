# frozen_string_literal: true

module Conversations
  class ConversationService # rubocop:disable Metrics/ClassLength
    class OpenAIApiError < StandardError; end

    META_PROMPT = <<-PROMPT
      Answer a question about the given text.
      If the question does not relate to the text, kindly but firmly answer that it is out of the scope of the discussion.
    PROMPT

    REQUEST_MAX_TOKEN_SIZE_GPT_3 = 16_000
    REQUEST_MAX_TOKEN_SIZE_GPT_4 = 8_000
    CHARACTERS_PER_TOKEN = 4
    TOKEN_SPACE_FOR_ANSWER = 1000

    def initialize(conversation) # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
      @conversation = conversation
      @user = conversation.user
      @sources = conversation.sources
      @last_user_question = @conversation.messages.where(role: 'user').last.content
      @conversation_messages = @conversation.messages.reject do |m|
        m.role == 'error'
      end
      @conversation_messages = @conversation_messages.map { |message| { role: message.role, content: message.content } }
      @openai_service = OpenaiService.new
      @requests_made = 0
    end

    def respond
      answer = handle_business
      @conversation.messages.create!(role: 'assistant', content: answer, partial_answers: @partial_answers || [])
    end

    private

    def handle_business
      answer = obtain_answer
      update_request_counts
      answer
    end

    def obtain_answer
      if @sources.count == 1
        get_answer_from_source(@sources.first)
      elsif @sources.count > 1
        handle_multiple_sources
      else
        rephrase_with_voices(get_answer_without_sources)
      end
    end

    def handle_multiple_sources
      if all_sources_fit_in_multi_limit?
        rephrase_with_voices(get_answer_from_multiple_sources)
      else
        refuse_answering_from_multiple_sources_that_are_too_big
      end
    end

    def get_answer_from_multiple_sources # rubocop:disable Metrics/MethodLength
      messages = []
      @sources.each do |source|
        chunk = source.document_chunks.first
        messages << { role: 'system', content: "#{chunk.content} #{chunk_context_prompt(chunk)}" }
      end
      messages += @conversation_messages
      messages << {
        role: 'system',
        content: <<-CONTENT
          Answer the question above in the context of all three provided sources.
          There are #{@sources.count} sources in the context of this query.
          All the sources that are the context of this query are: #{@sources.map(&:name).join(' ')}
        CONTENT
      }
      client_chat(messages)
    end

    def all_sources_fit_in_multi_limit?
      per_source_token_limit = (REQUEST_MAX_TOKEN_SIZE_GPT_3 - TOKEN_SPACE_FOR_ANSWER) / @sources.count
      @sources.all? do |source|
        source.document_chunks.map(&:token_length).compact.sum <= per_source_token_limit
      end
    end

    def refuse_answering_from_multiple_sources_that_are_too_big
      rephrase_nicely(
        'The source material is too large for me to handle. If you have multiple small sources, try to split them across separate projects. If some of your sources are large (over one chunk), you may want to try putting them in one project each.' # rubocop:disable Layout/LineLength
      )
    end

    def rephrase_nicely(text)
      prompt = <<-PROMPT
        #{text}

        Rewrite the sentence in first person from the perspective of the chatbot called WROOM. Do not use the word "as".
      PROMPT
      messages = [{ role: 'user', content: prompt }]
      client_chat(messages, simple: true)
    end

    def update_request_counts
      @conversation.update!(
        total_requests: @conversation.total_requests + @requests_made,
        last_query_requests: @requests_made
      )
    end

    def get_answer_without_sources
      client_chat(@conversation_messages)
    end

    def get_answer_from_source(source)
      chunks = source.document_chunks
      answer = if chunks.size == 1
                 get_answer_from_chunk(chunks.first)
               elsif chunks.size > 1
                 get_answer_from_multiple_chunks(chunks)
               else
                 rephrase_nicely("There was a problem processing #{source.name}, you may have to upload it again.")
               end
      rephrase_with_voices(answer)
    end

    def get_answer_from_multiple_chunks(chunks)
      answers = chunks.map { |chunk| { text: get_answer_from_chunk(chunk), source_name: chunk.source.name } }
      @partial_answers = filter_out_non_answers(answers)
      get_summary_answer(answers)
    end

    def filter_out_non_answers(answers) # rubocop:disable Metrics/MethodLength
      filtered_answers = []
      answers.each do |answer|
        message_content = <<-CONTENT
          #{answer[:text]}\nDoes this text contain the answer to the question: \"#{@last_user_question}\"? Answer YES or NO.
        CONTENT
        messages = [
          { role: 'user',
            content: message_content }
        ]
        decision = client_chat(messages, simple: true)
        filtered_answers << answer[:text] unless decision.include?('NO')
      end
      filtered_answers
    end

    def get_summary_answer(answers)
      summary_prompt = <<-PROMPT
        Shorten the text below so that no information is repeated. Remove sentences that suggest the speaker#{' '}
        does not have the answer.
      PROMPT
      messages = [
        { role: 'system', content: answers.join(' ') }
      ]
      messages << { role: 'system', content: summary_prompt }
      rephrase_with_voices(client_chat(messages, simple: true))
    end

    def rephrase_with_voices(string) # rubocop:disable Metrics/MethodLength
      if @conversation.voices.any?
        client_chat(
          [{
            role: 'system', content: string
          }, {
            role: 'system',
            content: <<-CONTENT
              Rewrite the text above taking into account these instructions:#{' '}
              #{@conversation.voices.pluck(:meta_prompt).join(' ')}
            CONTENT
          }]
        )
      else
        string
      end
    end

    def get_answer_from_chunk(chunk)
      messages = prepare_messages_for_chunk(chunk)

      answer = client_chat(messages)
      if chunk.section_header.present? && chunk.source.document_chunks.size > 1
        answer << "(based on #{chunk.section_header})"
      end
      answer
    end


    def prepare_messages_for_chunk(chunk)
      messages = @conversation_messages.dup.unshift({ role: 'system', content: chunk.content })
      last_user_message = messages.pop
      messages << { role: 'system', content: META_PROMPT }
      messages << { role: 'system', content: chunk_context_prompt(chunk) }
      messages << last_user_message
      messages
    end

    def chunk_context_prompt(chunk) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize, Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity
      chunk_source = chunk.source
      prompt = ['The following question concerns']
      if chunk_source.document_chunks.count > 1
        prompt << (chunk.section_header.present? ? chunk.section_header.to_s : 'an excerpt')
        prompt << 'from the provided'
      else
        prompt << 'the provided'
      end
      prompt << (chunk_source.text_category.present? ? chunk_source.text_category.to_s : 'text')
      prompt << '.'

      if chunk_source.title.present?
        prompt << 'The title of the'
        prompt << (chunk_source.text_category.present? ? chunk_source.text_category.to_s : 'text')
        prompt << "is #{chunk_source.title}."
      end

      if chunk_source.author.present?
        prompt << 'The author of the'
        prompt << (chunk_source.text_category.present? ? chunk_source.text_category.to_s : 'text')
        prompt << "is #{chunk_source.author}."
      end

      if chunk_source.year_published.present?
        prompt << 'The publication year of the'
        prompt << (chunk_source.text_category.present? ? chunk_source.text_category.to_s : 'text')
        prompt << "is #{chunk_source.year_published}."
      end

      prompt.join(' ')
    end

    def response_from_messages(messages, simple: false) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
      token_count = count_tokens_in_messages(messages)
      @user.update!(tokens_used: @user.tokens_used + token_count)
      if simple
        @openai_service.gpt_3_5_turbo(messages)
      elsif token_count <= REQUEST_MAX_TOKEN_SIZE_GPT_4 - TOKEN_SPACE_FOR_ANSWER
        @openai_service.gpt_4(messages)
      else
        @openai_service.gpt_3_5_turbo_16k(messages)
      end
    end

    def client_chat(messages, simple: false)
      @requests_made += 1
      response_from_messages(messages, simple:)
    rescue Faraday::TimeoutError
      'I have not succeded processing your request, please try again.'
    end
  end
end
