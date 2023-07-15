# frozen_string_literal: true

class AnswerFetchingWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(conversation_id) # rubocop:disable Metrics/MethodLength
    conversation = Conversation.find(conversation_id)
    begin
      Conversations::ConversationService.new(conversation).respond
      conversation.update!(status: 0)
    rescue StandardError => e
      logger.error e.message
      logger.error e.backtrace.join("\n")
      conversation.update!(status: 3)
      conversation.messages.create!(content: 'I have failed to come up with a response, please try again',
                                    role: 'error')
    end
  end
end
