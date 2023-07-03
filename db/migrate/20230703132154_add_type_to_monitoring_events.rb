# frozen_string_literal: true

class AddTypeToMonitoringEvents < ActiveRecord::Migration[7.0]
  def change
    add_column :monitoring_events, :event_type, :integer
  end
end
