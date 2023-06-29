# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :conversation
  validates :content, presence: true
  enum role: { 'user': 0, 'assistant': 1, 'system': 2, 'error': 3 }

  after_create_commit :force_conversation_refresh

  private

  def force_conversation_refresh
    return unless conversation.status.zero?

    Rails.logger.debug 'FORCE REFRESH CALLBACK CALLED && MESSAGE READY'
    broadcast_replace_to(
      conversation.id,
      'conversation_status',
      partial: 'documents/conversation_status',
      target: 'conversation_status'
    )
  end
end
