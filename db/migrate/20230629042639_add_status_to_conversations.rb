# frozen_string_literal: true

class AddStatusToConversations < ActiveRecord::Migration[7.0]
  def change
    add_column :conversations, :status, :integer
  end
end
