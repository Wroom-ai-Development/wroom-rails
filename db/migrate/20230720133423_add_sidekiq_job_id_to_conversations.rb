# frozen_string_literal: true

class AddSidekiqJobIdToConversations < ActiveRecord::Migration[7.0]
  def change
    add_column :conversations, :sidekiq_job_id, :string
  end
end
