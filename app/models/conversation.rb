# frozen_string_literal: true

class Conversation < ApplicationRecord
  belongs_to :user
  has_many :messages, dependent: :destroy
  has_many :context_references, dependent: :destroy
  has_many :sources, through: :context_references
  has_many :usage_records, dependent: :nullify

  belongs_to :project
  has_one :conversation_voice, dependent: :destroy
  has_one :voice, through: :conversation_voice
  validates :title, presence: true
  after_update :broadcast_status_message

  enum role: { 'ready': 0, 'working': 1, 'idle': 2, 'error': 3, 'cancelled': 4 }

  def clear_status_message
    update!(status_message: nil)
  end

  def cancel_processing
    return if sidekiq_job_id.blank?

    messages.last.destroy!
    Sidekiq::Status.delete(sidekiq_job_id)
    update!(sidekiq_job_id: nil, status: 4, status_message: "Processing cancelled at #{Time.zone.now}")
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
