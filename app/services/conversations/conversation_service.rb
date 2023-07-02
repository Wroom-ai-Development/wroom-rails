# frozen_string_literal: true

module Conversations
  class ConversationService # rubocop:disable Metrics/ClassLength
    class OpenAIApiError < StandardError; end

    META_PROMPT = <<-PROMPT
      Answer a question about the given text.
      If the question does not relate to the text, kindly but firmly answer that it is out of the scope of the discussion.
    PROMPT

    REQUEST_MAX_TOKEN_SIZE = 14_000
    CHARACTERS_PER_TOKEN = 4
    TOKEN_SPACE_FOR_ANSWER = 1000

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

    def respond # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
      if @sources.count == 1
        get_answer_from_source(@sources.first)
        update_request_counts
      elsif @sources.count > 1 && @sources.count < 4
        if all_sources_fit_in_multi_limit?
          get_answer_from_multiple_sources
        else
          refuse_answering_from_multiple_sources_that_are_too_big
        end
        update_request_counts
      elsif @sources.count >= 4
        refuse_answering_from_too_many_sources
        update_request_counts
      else
        answer = get_answer_without_sources
        update_request_counts
        @conversation.update!(status: 0)
        @conversation.messages.create!(role: 'assistant', content: answer)
      end
    end

    private

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
      response = get_answer_from_messages(messages)
      @conversation.update!(status: 0)
      @conversation.messages.create!(role: 'assistant', content: response)
    end

    def all_sources_fit_in_multi_limit?
      return false unless @sources.count < 4 && all_sources_have_a_single_chunk?

      per_source_character_limit = CHARACTERS_PER_TOKEN * (REQUEST_MAX_TOKEN_SIZE - TOKEN_SPACE_FOR_ANSWER) / @sources.count # rubocop:disable Layout/LineLength
      @sources.all? do |source|
        source.document_chunks.first.content.length <= per_source_character_limit
      end
    end

    def all_sources_have_a_single_chunk?
      @sources.all? { |source| source.document_chunks.count == 1 }
    end

    def refuse_answering_from_multiple_sources_that_are_too_big
      respond_nicely(
        'At the moment WROOM can only handle small sources when using more source than one at the same time. If you would like to ask about larger sources, please link them up one at a time.' # rubocop:disable Layout/LineLength
      )
    end

    def refuse_answering_from_too_many_sources
      respond_nicely(
        "At the moment WROOM cannot handle more three four small-volume sources at once, but I\'ve been told by the development team that this will soon change." # rubocop:disable Layout/LineLength
      )
    end

    def respond_nicely(text)
      prompt = <<-PROMPT
        Please rephrase this sentence:#{' '}
        "#{text}"

        Make it nice, quirky, and not very apologetic.
      PROMPT
      messages = [{ role: 'user', content: prompt }]
      response = client_chat(messages, 'gpt-3.5-turbo')
      @conversation.update!(status: 0)
      @conversation.messages.create!(role: 'assistant', content: response)
    end

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
        respond_nicely("There was a problem processing #{source.name}, you may have to upload it again.")
      end
    end

    def get_answer_from_multiple_chunks(chunks)
      answers = chunks.map { |chunk| { text: get_answer_from_chunk(chunk), source_name: chunk.source.name } }
      answers = filter_out_non_answers(answers)
      summary_answer = get_summary_answer(answers)
      @conversation.update!(status: 0)
      @conversation.messages.create!(role: 'assistant', content: summary_answer, partial_answers: answers)
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
        decision = client_chat(messages, 'gpt-3.5-turbo')
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
      response = client_chat(messages, 'gpt-3.5-turbo')
      if @conversation.voices.any?
        client_chat(
          [{
            role: 'system', content: response
          }, {
            role: 'system',
            content: <<-CONTENT
              Rewrite the text above taking into account these instructions:#{' '}
              #{@conversation.voices.pluck(:meta_prompt).join(' ')}
            CONTENT
          }],
          'gpt-3.5-turbo'
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

    def get_answer_from_messages(messages)
      client_chat(messages)
    end

    def client_chat(messages, model = 'gpt-3.5-turbo-16k')
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
