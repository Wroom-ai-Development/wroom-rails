# frozen_string_literal: true

module Conversations
  class ConversationService
    class DocumentHasNoDocumentChunks < StandardError; end

    META_PROMPT = <<-PROMPT
      Answer a question about the given text.
      If the question does not relate to the text, kindly but firmly answer that it is out of the scope of the discussion.
    PROMPT

    def initialize(conversation)
      @conversation = conversation
      @documents = conversation.documents
      @client = OpenAI::Client.new(access_token: ENV['OPENAI_ACCESS_KEY'])
      @messages = @conversation.messages.map { |message| { role: message.role, content: message.content } }
    end

    def get_response
      if @documents.size == 1
        get_answer_from_document(@documents[0])
      elsif @documents.size > 1
        get_answer_from_multiple_documents(@documents)
      else
        get_answer_without_documents
      end
    end

    private

    def get_answer_without_documents
      get_answer_from_messages(@messages)
    end

    def get_answer_from_document(document)
      chunks = document.document_chunks
      if chunks.size == 1
        get_answer_from_chunk(chunks[0])
      elsif chunks.size > 1
        get_answer_from_multiple_chunks(chunks)
      else
        raise DocumentHasNoDocumentChunks
      end
    end

    def get_answer_from_chunk(chunk)
      messages = prepare_messages_for_chunk(chunk)
      get_answer_from_messages(messages)
    end

    def prepare_messages_for_chunk(chunk)
      chunk_message = { role: 'system', content: chunk.content }
      messages = @messages.unshift(chunk_message)
      last_user_message = messages.pop
      messages << { role: 'system', content: META_PROMPT }
      messages << last_user_message
      messages
    end

    def get_answer_from_messages(messages)
      response = @client.chat(
        parameters: {
          model: 'gpt-3.5-turbo-16k', # Required.
          messages:
        }
      )
      response.dig('choices', 0, 'message', 'content')
    end
  end
end
