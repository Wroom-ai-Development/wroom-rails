# frozen_string_literal: true

class Conversation < ApplicationRecord
  belongs_to :user
  has_many :messages, dependent: :destroy
  has_many :context_references, dependent: :destroy
  has_many :sources, through: :context_references
  has_many :usage_records, dependent: :nullify

  belongs_to :project
  has_many :conversation_voices, dependent: :destroy
  has_many :voices, through: :conversation_voices
  validates :title, presence: true
  after_update :broadcast_status_message

  enum role: { 'ready': 0, 'working': 1, 'idle': 2, 'error': 3 }

  def clear_status_message
    update!(status_message: nil)
  end

  private

  def broadcast_status_message
    return if status_message.blank?

    broadcast_replace_to(
      id,
      'conversation_status',
      partial: 'conversations/conversation_status',
      locals: {
        conversation: self
      },
      target: 'conversation_status'
    )
  end
end
