# frozen_string_literal: true

module Conversations
  class ConversationService # rubocop:disable Metrics/ClassLength
    class SourceHasNoDocumentChunks < StandardError; end
    class OpenAIApiError < StandardError; end

    META_PROMPT = <<-PROMPT
      Answer a question about the given text.
      If the question does not relate to the text, kindly but firmly answer that it is out of the scope of the discussion.
    PROMPT

    def initialize(conversation)
      @conversation = conversation
      @sources = conversation.sources
      @client = OpenAI::Client.new(access_token: ENV['OPENAI_ACCESS_KEY'])
      @last_user_question = @conversation.messages.where(role: 'user').last.content
      @conversation_messages = @conversation.messages.reject do |m|
        m.role == 'error'
      end
      @conversation_messages = @conversation_messages.map { |message| { role: message.role, content: message.content } }
      @requests_for_current_query = 0
    end

    def respond # rubocop:disable Metrics/MethodLength
      if @sources.any?
        @sources.each do |source|
          get_answer_from_source(source)
        end
        update_request_counts
      else
        answer = get_answer_without_sources
        update_request_counts
        @conversation.update!(status: 0)
        @conversation.messages.create!(role: 'assistant', content: answer)
      end
    end

    private

    def update_request_counts
      @conversation.update!(
        total_requests: @conversation.total_requests + @requests_for_current_query,
        last_query_requests: @requests_for_current_query
      )
    end

    def get_answer_without_sources
      get_answer_from_messages(@conversation_messages)
    end

    def get_answer_from_source(source) # rubocop:disable Metrics/MethodLength
      chunks = source.document_chunks
      if chunks.size == 1
        source_identifier = @sources.size > 1 ? " (based on #{source.title})" : ''
        answer = get_answer_from_chunk(chunks[0])
        @conversation.update!(status: 0)
        @conversation.messages.create!(role: 'assistant',
                                       content: "#{answer} #{source_identifier}")
      elsif chunks.size > 1
        get_answer_from_multiple_chunks(chunks)
      else
        raise SourceHasNoDocumentChunks
      end
    end

    def get_answer_from_multiple_chunks(chunks)
      answers = chunks.map { |chunk| get_answer_from_chunk(chunk) }
      answers = filter_out_non_answers(answers)
      summary_answer = get_summary_answer(answers)
      @conversation.update!(status: 0)
      @conversation.messages.create!(role: 'assistant', content: summary_answer, partial_answers: answers)
    end

    def filter_out_non_answers(answers) # rubocop:disable Metrics/MethodLength
      filtered_answers = []
      answers.each do |answer|
        message_content = <<-CONTENT
          #{answer}\nDoes this text contain the answer to the question: \"#{@last_user_question}\"? Answer YES or NO.
        CONTENT
        messages = [
          { role: 'user',
            content: message_content }
        ]
        decision = client_chat('gpt-3.5-turbo', messages)
        filtered_answers << answer unless decision.include?('NO')
      end
      filtered_answers
    end

    def get_summary_answer(answers) # rubocop:disable Metrics/MethodLength
      summary_prompt = <<-PROMPT
        Shorten the text below so that no information is repeated. Remove sentences that suggest the speaker#{' '}
        does not have the answer.
      PROMPT
      messages = [
        { role: 'system', content: answers.join(' ') }
      ]
      messages << { role: 'system', content: summary_prompt }
      response = client_chat('gpt-3.5-turbo', messages)
      if @conversation.voices.any?
        client_chat(
          'gpt-3.5-turbo',
          [{
            role: 'system', content: response
          }, {
            role: 'system',
            content: <<-CONTENT
              Rewrite the text above taking into account these instructions:#{' '}
              #{@conversation.voices.pluck(:meta_prompt).join(' ')}
            CONTENT
          }]
        )
      else
        response
      end
    end

    def get_answer_from_chunk(chunk)
      messages = prepare_messages_for_chunk(chunk)
      answer = get_answer_from_messages(messages)
      if chunk.section_header.present? && chunk.source.document_chunks.size > 1
        answer << "(based on #{chunk.section_header})"
      end
      answer
    end

    def prepare_messages_for_chunk(chunk) # rubocop:disable Metrics/MethodLength
      messages = @conversation_messages.dup.unshift({ role: 'system', content: chunk.content })
      last_user_message = messages.pop
      if @conversation.voices.any?
        @conversation.voices.each do |voice|
          messages << { role: 'system', content: voice.meta_prompt }
        end
      else
        messages << { role: 'system', content: META_PROMPT }
      end
      messages << { role: 'system', content: chunk_context_prompt(chunk) }
      messages << last_user_message
      messages
    end

    def chunk_context_prompt(chunk) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize, Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity
      source = chunk.source
      prompt = ['The following question concerns']
      if source.document_chunks.count > 1
        prompt << (chunk.section_header.present? ? chunk.section_header.to_s : 'an excerpt')
        prompt << 'from the provided'
      else
        prompt << 'the provided'
      end
      prompt << (source.text_category.present? ? source.text_category.to_s : 'text')
      prompt << '.'

      if source.title.present?
        prompt << 'The title of the'
        prompt << (source.text_category.present? ? source.text_category.to_s : 'text')
        prompt << "is #{source.title}."
      end

      if source.author.present?
        prompt << 'The author of the'
        prompt << (source.text_category.present? ? source.text_category.to_s : 'text')
        prompt << "is #{source.author}."
      end

      if source.year_published.present?
        prompt << 'The publication year of the'
        prompt << (source.text_category.present? ? source.text_category.to_s : 'text')
        prompt << "is #{source.year_published}."
      end

      prompt.join(' ')
    end

    def get_answer_from_messages(messages)
      client_chat('gpt-3.5-turbo-16k', messages)
    end

    def client_chat(model, messages)
      response = @client.chat(
        parameters: {
          model:,
          messages:
        }
      )
      @requests_for_current_query += 1
      raise OpenAIApiError, response['error']['message'] if response['error']

      response.dig('choices', 0, 'message', 'content')
    end
  end
end
