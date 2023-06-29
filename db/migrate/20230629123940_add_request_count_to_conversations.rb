# frozen_string_literal: true

class AddRequestCountToConversations < ActiveRecord::Migration[7.0]
  def change
    add_column :conversations, :total_requests, :integer, null: false, default: 0
    add_column :conversations, :last_query_requests, :integer, null: false, default: 0
  end
end
