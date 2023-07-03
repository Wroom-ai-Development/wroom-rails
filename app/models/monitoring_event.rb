# frozen_string_literal: true

class MonitoringEvent < ApplicationRecord
  belongs_to :trackable, polymorphic: true
  enum event_type: {
    'create_record': 0,
    'message': 1
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
end
