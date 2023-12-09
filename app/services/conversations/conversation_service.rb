# frozen_string_literal: true

module Conversations
  class ConversationService # rubocop:disable Metrics/ClassLength
    class OpenAIApiError < StandardError; end
    class ContextExceeded < StandardError; end
    class InterruptSignal < StandardError; end
    class ConversationStatusIsNotWorking < StandardError; end

    META_PROMPT = <<-PROMPT.freeze
      Provide an adequate response to a query related to the provided texts.
      If the query doesn’t relate to the text, kindly but firmly answer that it is out of the scope of the given texts.#{' '}
      Then try and provide an answer if available from your general knowledge.
    PROMPT

    REQUEST_MAX_TOKEN_SIZES = {
      'gpt-3.5-turbo-16k' => 16_000,
      'gpt-3.5-turbo' => 4_000,
      'gpt-4' => 8_000
    }.freeze
    CHARACTERS_PER_TOKEN = 4
    TOKEN_SPACE_FOR_ANSWER = 1000

    def initialize(conversation) # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
      @conversation = conversation
      @user = conversation.user
      @conversation.documents.each do |document|
        document.refresh_source unless document.source_based
      end
      @sources = conversation.sources
      @last_user_question = @conversation.messages.kept.where(role: 'user').last.content
      @conversation_messages = @conversation.messages.kept.order(:created_at).reject do |m|
        m.role == 'error'
      end
      @conversation_messages = @conversation_messages.map { |message| { role: message.role, content: message.content } }

      @openai_service = OpenaiService.new
      @requests_made = 0
    end

    def respond
      if @user.gpt_budget_available.positive?
        answer = handle_business
        @conversation.messages.create!(role: 'assistant', content: answer, partial_answers: @partial_answers || [])
      else
        @conversation.messages.create!(role: 'assistant', content: 'Sorry, but you ran out of Mana!')
      end
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
        rephrase_with_voice(get_answer_without_sources)
      end
    end

    def handle_multiple_sources
      @conversation.update!(status_message: "Processing #{@sources.count} sources")

      if all_sources_fit_in_multi_limit?
        rephrase_with_voice(get_answer_from_multiple_sources)
      else
        refuse_answering_from_multiple_sources_that_are_too_big
      end
    end

    def get_answer_from_multiple_sources # rubocop:disable Metrics/MethodLength
      messages = []
      @sources.each do |source|
        next unless source.source_chunks.any?

        source.source_chunks.each do |chunk|
          messages << { role: 'system', content: "#{chunk.content} #{chunk_context_prompt(chunk)}" }
        end
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
      response_from_messages(messages, model: @conversation.user.gpt_4_enabled ? 'gpt-4' : 'gpt-3.5-turbo-16k')
    end

    def all_sources_fit_in_multi_limit?
      total_tokens = @sources.map { |source| source.source_chunks.map(&:token_length).compact.sum }.sum
      total_limit = @conversation.user.gpt_4_enabled ? REQUEST_MAX_TOKEN_SIZES['gpt-4'] : REQUEST_MAX_TOKEN_SIZES['gpt-3.5-turbo-16k'] # rubocop:disable Layout/LineLength
      total_tokens <= total_limit - TOKEN_SPACE_FOR_ANSWER
    end

    def refuse_answering_from_multiple_sources_that_are_too_big
      'The source material is too large for me to handle. If you have multiple small sources, try to split them across separate documents. If some of your sources are large (over one chunk), you may want to try putting them in one document each.' # rubocop:disable Layout/LineLength
    end

    def rephrase_nicely(text)
      prompt = <<-PROMPT
        #{text}

        Rewrite the sentence in first person from the perspective of the chatbot called WROOM. Do not use the word "as".
      PROMPT
      messages = [{ role: 'user', content: prompt }]
      response_from_messages(messages, model: 'gpt-3.5-turbo')
    end

    def update_request_counts
      @conversation.update!(
        total_requests: @conversation.total_requests + @requests_made,
        last_query_requests: @requests_made
      )
    end

    def get_answer_without_sources
      @conversation.update!(status_message: 'Processing without sources')
      response_from_messages(@conversation_messages, model: 'gpt-3.5-turbo-16k')
    end

    def get_answer_from_source(source)
      @conversation.update!(status_message: "Processing #{source.name}")
      chunks = source.source_chunks
      answer = if chunks.size == 1
                 get_answer_from_chunk(chunks.first)
               elsif chunks.size > 1
                 get_answer_from_multiple_chunks(chunks)
               else
                 get_answer_without_sources
               end
      rephrase_with_voice(answer)
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
          Does this text contain the information sought in this question: \"#{@last_user_question}\"? Answer YES or NO, and always in English, regardless of the language of the question.
        CONTENT
        messages = [
          { role: 'system', content: answer[:text] },
          { role: 'user',
            content: message_content }
        ]
        decision = response_from_messages(messages, model: 'gpt-3.5-turbo', max_tokens: 1)
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
      rephrase_with_voice(response_from_messages(messages,
                                                 model: @conversation.user.gpt_4_enabled ? 'gpt-4' : 'gpt-3.5-turbo-16k')) # rubocop:disable Layout/LineLength
    end

    def rephrase_with_voice(string) # rubocop:disable Metrics/MethodLength
      @conversation.update!(status_message: 'Applying voice')
      if @conversation.voice.present?
        response_from_messages(
          [{
            role: 'system', content: string
          }, {
            role: 'system',
            content: <<-CONTENT
              Rewrite the text above taking into account these instructions:#{' '}
              #{@conversation.voice.meta_prompt}
            CONTENT
          }],
          model: 'gpt-3.5-turbo'
        )
      else
        string
      end
    end

    def get_answer_from_chunk(chunk) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
      messages = prepare_messages_for_chunk(chunk)
      tokens_in_messages = TokenCounter.new('gpt-4').count_tokens(messages.map { |m| m[:content] }.join(' '))
      tokens_needed = chunk.token_length + tokens_in_messages
      model = if tokens_needed <= REQUEST_MAX_TOKEN_SIZES['gpt-3.5-turbo'] - TOKEN_SPACE_FOR_ANSWER
                'gpt-3.5-turbo'
              elsif tokens_needed <= REQUEST_MAX_TOKEN_SIZES['gpt-3.5-turbo-16k'] - TOKEN_SPACE_FOR_ANSWER
                'gpt-3.5-turbo-16k'
              else
                raise ContextExceeded
              end
      answer = response_from_messages(messages, model:)
      if chunk.section_header.present? && chunk.source.source_chunks.size > 1
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
      if chunk_source.source_chunks.count > 1
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

    def response_from_messages(messages, model: 'gpt-3.5-turbo', max_tokens: nil) # rubocop:disable Metrics/AbcSize
      interrupt_if_warranted
      token_count = count_tokens_in_messages(messages)
      raise ContextExceeded if token_count > REQUEST_MAX_TOKEN_SIZES[model]

      @user.update!(tokens_used: @user.tokens_used + token_count)

      tokens_left_for_answer = REQUEST_MAX_TOKEN_SIZES[model] - token_count
      response = @openai_service.chat_completion(messages, model, max_tokens || tokens_left_for_answer)
      # binding.pry

      @requests_made += 1

      raise OpenAIApiError, response['error'].to_json if response['error'].present?

      TokenUsageService.new(@user, @conversation, model).persist_token_usage(messages, response)

      response
    end

    def interrupt_if_warranted
      if @conversation.reload.status == 4
        @conversation.update!(status_message: 'Conversation was interrupted', status: 0)
        raise InterruptSignal
      elsif @conversation.reload.status != 1
        raise ConversationStatusIsNotWorking
      end
    end
  end
end
