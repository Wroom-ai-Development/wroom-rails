# frozen_string_literal: true

module Conversations
  class ProgressDisclaimer
    def initialize(conversation)
      @conversation = conversation
    end

    def notify_of_progress(notification_content)
      @conversation.messages.create!(role: 'progress', content: notification_content)
    end

    def clear_progress_messages
      @conversation.messages.where(role: 'progress').destroy_all
    end
  end
end
