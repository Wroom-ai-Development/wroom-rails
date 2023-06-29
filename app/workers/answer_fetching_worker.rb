# frozen_string_literal: true

class AnswerFetchingWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(conversation_id)
    conversation = Conversation.find(conversation_id)
    begin
      Conversations::ConversationService.new(conversation).respond
    rescue Conversations::ConversationService::OpenAIApiError => e
      conversation.update!(status: 3)
      conversation.messages.create!(content: e, role: 'error')
    end
  end
end
