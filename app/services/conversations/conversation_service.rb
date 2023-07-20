# frozen_string_literal: true

module Conversations
  class ConversationService # rubocop:disable Metrics/ClassLength
    class OpenAIApiError < StandardError; end
    class ContextExceeded < StandardError; end
    class InterruptSignal < StandardError; end
    class ConversationStatusIsNotWorking < StandardError; end

    META_PROMPT = <<-PROMPT
      Answer a question about the given text.
      If the question does not relate to the text, kindly but firmly answer that it is out of the scope of the discussion.
    PROMPT

    REQUEST_MAX_TOKEN_SIZE_GPT_3_16K = 16_000
    REQUEST_MAX_TOKEN_SIZE_GPT_3 = 4_000
    REQUEST_MAX_TOKEN_SIZE_GPT_4 = 8_000
    CHARACTERS_PER_TOKEN = 4
    TOKEN_SPACE_FOR_ANSWER = 1000

    def initialize(conversation) # rubocop:disable Metrics/AbcSize
      @conversation = conversation
      @user = conversation.user
      @sources = conversation.sources
      @last_user_question = @conversation.messages.where(role: 'user').last.content
      @conversation_messages = @conversation.messages.order(:created_at).reject do |m|
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
      @conversation.update!(status_message: "Processing #{@sources.count} sources")

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
      response_from_messages(messages)
    end

    def all_sources_fit_in_multi_limit?
      total_tokens = @sources.map { |source| source.document_chunks.map(&:token_length).compact.sum }.sum
      total_tokens <= REQUEST_MAX_TOKEN_SIZE_GPT_3_16K - TOKEN_SPACE_FOR_ANSWER
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
      response_from_messages(messages, simple: true)
    end

    def update_request_counts
      @conversation.update!(
        total_requests: @conversation.total_requests + @requests_made,
        last_query_requests: @requests_made
      )
    end

    def get_answer_without_sources
      @conversation.update!(status_message: 'Processing without sources')
      response_from_messages(@conversation_messages)
    end

    def get_answer_from_source(source)
      @conversation.update!(status_message: "Processing #{source.name}")
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
      total_chunks = chunks.size
      answers = []
      chunks.each_with_index do |chunk, index|
        answers << { text: get_answer_from_chunk(chunk), source_name: chunk.source.name }
        @conversation.update!(status_message: "Processing #{index + 1} of #{total_chunks} chunks")
      end
      @partial_answers = filter_out_non_answers(answers)
      get_summary_answer(answers)
    end

    def filter_out_non_answers(answers) # rubocop:disable Metrics/MethodLength
      filtered_answers = []
      answers.each_with_index do |answer, index|
        @conversation.update!(status_message: "Reviewing answer based on chunk #{index + 1}")
        message_content = <<-CONTENT
          #{answer[:text]}\nDoes this text contain the answer to the question: \"#{@last_user_question}\"? Answer YES or NO, and always in English, regardless of the language of the question.
        CONTENT
        messages = [
          { role: 'user',
            content: message_content }
        ]
        decision = response_from_messages(messages, simple: true)
        filtered_answers << answer[:text] unless decision.include?('NO')
      end
      filtered_answers
    end

    def get_summary_answer(answers)
      summary_prompt = <<-PROMPT
        Answer the following question in terms of the above: #{@last_user_question}
      PROMPT
      messages = [
        { role: 'system', content: answers.join(' ') }
      ]
      messages << { role: 'system', content: summary_prompt }
      @conversation.update!(status_message: 'Summarizing obtained information')
      rephrase_with_voices(response_from_messages(messages))
    end

    def rephrase_with_voices(string) # rubocop:disable Metrics/MethodLength
      @conversation.update!(status_message: 'Applying voices')
      if @conversation.voices.any?
        response_from_messages(
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

      answer = response_from_messages(messages)
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

    def count_tokens_in_messages(messages)
      full_text = messages.map { |m| m[:content] }.join(' ')
      TokenCounter.new('gpt-4').count_tokens(full_text)
    end

    def response_from_messages(messages, simple: false) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
      interrupt_if_warranted
      token_count = count_tokens_in_messages(messages)
      raise ContextExceeded if token_count > REQUEST_MAX_TOKEN_SIZE_GPT_3_16K

      @user.update!(tokens_used: @user.tokens_used + token_count)
      model = ''
      response = if simple
                   tokens_left_for_answer = REQUEST_MAX_TOKEN_SIZE_GPT_3 - token_count
                   model = 'gpt-3.5-turbo'
                   @openai_service.gpt_3_5_turbo(messages, tokens_left_for_answer)
                 elsif token_count <= REQUEST_MAX_TOKEN_SIZE_GPT_4 - TOKEN_SPACE_FOR_ANSWER
                   tokens_left_for_answer = REQUEST_MAX_TOKEN_SIZE_GPT_4 - token_count
                   model = 'gpt-4'
                   @openai_service.gpt_4(messages, tokens_left_for_answer)
                 else
                   tokens_left_for_answer = REQUEST_MAX_TOKEN_SIZE_GPT_3_16K - token_count
                   model = 'gpt-3.5-turbo-16k'
                   @openai_service.gpt_3_5_turbo_16k(messages, tokens_left_for_answer)
                 end
      @requests_made += 1

      raise OpenAIApiError, response['error'].to_json if response['error'].present?

      TokenUsageService.new(@user, @conversation, model).persist_token_usage(messages, response)

      response
    end

    def interrupt_if_warranted
      if @conversation.reload.status == 4
        @conversation.update!(status_message: 'Conversation was interrupted')
        raise InterruptSignal
      elsif @conversation.reload.status != 1
        raise ConversationStatusIsNotWorking
      end
    end
  end
end
