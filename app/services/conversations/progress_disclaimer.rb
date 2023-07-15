# frozen_string_literal: true

module Conversations
  class ProgressDisclaimer
    def initialize(conversation)
      @conversation = conversation
    end

    def notify_of_progress(message)
      # clear_progress_messages
      @conversation.messages.create!(role: 'progress', content: message)
    end

    def clear_progress_messages
      @conversation.messages.where(role: 'progress').destroy_all
    end
  end
end
