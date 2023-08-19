# frozen_string_literal: true

class Conversation < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :context_references, dependent: :destroy
  has_many :documents, through: :context_references
  has_many :usage_records, dependent: :nullify

  belongs_to :document
  has_one :user, through: :document
  has_one :conversation_voice, dependent: :destroy
  has_one :voice, through: :conversation_voice
  validates :title, presence: true
  after_update :broadcast_status_message

  enum role: { 'ready': 0, 'working': 1, 'idle': 2, 'error': 3, 'cancelled': 4 }

  def sources
    documents.map(&:source).compact
  end

  def clear_status_message
    update!(status_message: nil)
  end

  def cancel_processing
    return if sidekiq_job_id.blank?

    Sidekiq::Status.delete(sidekiq_job_id)
    update!(sidekiq_job_id: nil, status: 4, status_message: "Processing cancelled at #{Time.zone.now}")
  end

  private

  def broadcast_status_message
    return unless status_message.present? || saved_change_to_status?

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
