# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :conversation

  validates :content, presence: true
  enum role: { 'user': 0, 'assistant': 1, 'system': 2, 'error': 3 }
  has_many :monitoring_events, as: :trackable, dependent: :nullify

  after_create_commit :force_conversation_refresh
  after_create_commit :log_event

  private

  def force_conversation_refresh
    return unless role == 'assistant' || role == 'error'

    broadcast_replace_to(
      conversation.id,
      'conversation_status',
      partial: 'conversations/conversation_status',
      target: 'conversation_status'
    )
  end

  def log_event # rubocop:disable Metrics/MethodLength
    user = conversation.user
    note = case role
           when 'user' then "#{user.email} wrote a message"
           when 'assistant' then "wroom responded to #{user.email} after #{conversation.last_query_requests} reqs"
           when 'error' then "wroom responded to to #{user.email} with error : #{content}"
           end
    monitoring_events.create!(
      user_id: user.id,
      note:,
      event_type: 'message'
    )
  end
end
