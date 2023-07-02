# frozen_string_literal: true

class AddMonitoringEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :monitoring_events do |t|
      t.string :note
      t.bigint :trackable_id
      t.string :trackable_type
      t.bigint :user_id
      t.timestamps
    end
  end
end
