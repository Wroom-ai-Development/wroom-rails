# frozen_string_literal: true

class AddGptToggleToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :gpt_4_enabled, :boolean, default: false, null: false
  end
end
