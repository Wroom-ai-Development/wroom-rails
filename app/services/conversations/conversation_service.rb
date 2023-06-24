# frozen_string_literal: true

module Conversations
  class ConversationService # rubocop:disable Metrics/ClassLength
    class DocumentHasNoDocumentChunks < StandardError; end
    class OpenAIApiError < StandardError; end

    META_PROMPT = <<-PROMPT
      Answer a question about the given text.
      If the question does not relate to the text, kindly but firmly answer that it is out of the scope of the discussion.
    PROMPT

    def initialize(conversation)
      @conversation = conversation
      @documents = conversation.documents
      @client = OpenAI::Client.new(access_token: ENV['OPENAI_ACCESS_KEY'])
      @last_user_question = @conversation.messages.where(role: 'user').last.content
      @conversation_messages = @conversation.messages.reject do |m|
        m.role == 'error'
      end
      @conversation_messages = @conversation_messages.map { |message| { role: message.role, content: message.content } }
    end

    def respond
      if @documents.any?
        @documents.each do |document|
          get_answer_from_document(document)
        end
      else
        @conversation.messages.create!(role: 'assistant', content: get_answer_without_documents)
      end
    end

    private

    def get_answer_without_documents
      get_answer_from_messages(@conversation_messages)
    end

    def get_answer_from_document(document)
      chunks = document.document_chunks
      if chunks.size == 1
        document_identifier = @documents.size > 1 ? " (based on #{document.title})" : ''
        @conversation.messages.create!(role: 'assistant',
                                       content: get_answer_from_chunk(chunks[0]) + document_identifier)
      elsif chunks.size > 1
        get_answer_from_multiple_chunks(chunks)
      else
        raise DocumentHasNoDocumentChunks
      end
    end

    def get_answer_from_multiple_chunks(chunks)
      answers = chunks.map { |chunk| get_answer_from_chunk(chunk) }
      answers = filter_out_non_answers(answers)
      summary_answer = get_summary_answer(answers)
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

    def get_summary_answer(answers)
      summary_prompt = <<-PROMPT
        Shorten the text above so that no information is repeated. Remove sentences that suggest the speaker#{' '}
        does not have the answer.
      PROMPT
      messages = [
        { role: 'system', content: answers.join(' ') },
        { role: 'user', content: summary_prompt }
      ]
      client_chat('gpt-3.5-turbo', messages)
    end

    def get_answer_from_chunk(chunk)
      messages = prepare_messages_for_chunk(chunk)
      answer = get_answer_from_messages(messages)
      if chunk.section_header.present? && chunk.document.document_chunks.size > 1
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
      document = chunk.document
      prompt = ['The following question concerns']
      if document.document_chunks.count > 1
        prompt << chunk.section_header.present? ? chunk.section_header.to_s : 'an excerpt'
        prompt << 'from the provided'
      else
        prompt << 'the provided'
      end
      prompt << document.text_category.present? ? document.text_category.to_s : 'text'
      prompt << '.'

      if document.title.present?
        prompt << 'The title of the'
        prompt << document.text_category.present? ? document.text_category.to_s : 'text'
        prompt << "is #{document.title}."
      end

      if document.author.present?
        prompt << 'The author of the'
        prompt << document.text_category.present? ? document.text_category.to_s : 'text'
        prompt << "is #{document.author}."
      end

      if document.year_published.present?
        prompt << 'The publication year of the'
        prompt << document.text_category.present? ? document.text_category.to_s : 'text'
        prompt << "is #{document.year_published}."
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
      raise OpenAIApiError, response['error']['message'] if response['error']

      response.dig('choices', 0, 'message', 'content')
    end
  end
end
