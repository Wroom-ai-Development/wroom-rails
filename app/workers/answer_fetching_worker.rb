# frozen_string_literal: true

class AnswerFetchingWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker
  sidekiq_options retry: false

  def expiration
    @expiration ||= 60 * 60 * 24 * 30 # 30 days
  end

  def perform(conversation_id) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
    conversation = Conversation.find(conversation_id)
    begin
      Conversations::ConversationService.new(conversation).respond
    rescue Conversations::ConversationService::InterruptSignal
      conversation.update!(status: 0)
    rescue Conversations::ConversationService::ConversationStatusIsNotWorking
      nil
    rescue Conversations::ConversationService::ContextExceeded
      conversation.update!(status: 3)
      conversation.messages.create!(content: 'There is too much text in your chat for me to handle',
                                    role: 'error')
    rescue Conversations::ConversationService::OpenAIApiError => e
      logger.error '~~~~~~ Conversations::ConversationService::OpenAIApiError ~~~~~~~~~'
      logger.error e
      logger.error e.message
      logger.error e.backtrace.join("\n")

      conversation.update!(status: 3)
      error = JSON.parse(e.message)
      content = case error['code']
                when 'rate_limit_exceeded'
                  if error['type'] == 'tokens'
                    'WROOM has exceeded its token rate limit with the Oracle'
                  else
                    'WROOM has exceeded its request rate limit with the Oracle'
                  end
                else
                  'I am having trouble contacting the Oracle, please try again'
                end

      conversation.messages.create!(content:,
                                    role: 'error')
    rescue StandardError => e
      logger.error e.message
      logger.error e.backtrace.join("\n")
      conversation.update!(status: 3)
      conversation.messages.create!(content: 'I have failed to come up with a response, please try again',
                                    role: 'error')
    end
  end
end
