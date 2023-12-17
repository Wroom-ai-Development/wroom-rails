# frozen_string_literal: true

class MonitoringEvent < ApplicationRecord
  belongs_to :trackable, polymorphic: true
  enum event_type: {
    'create_record': 0,
    'message': 1,
    'registration': 2,
    'sign_in': 3,
    'confirmation': 4
  }

  after_create_commit :broadcast_status

  private

  def broadcast_status
    broadcast_replace_to(
      'monitoring',
      partial: 'monitoring/monitoring',
      target: 'monitoring'
    )
  end

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "event_type", "id", "note", "trackable_id", "trackable_type", "updated_at", "user_id"]
  end
end
