# frozen_string_literal: true

class AddStatusMessageToConversation < ActiveRecord::Migration[7.0]
  def change
    add_column :conversations, :status_message, :string
  end
end
