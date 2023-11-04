# frozen_string_literal: true

class AddCancelledToSubscriptions < ActiveRecord::Migration[7.0]
  def change
    add_column :subscriptions, :cancelled, :boolean, default: false, null: false
  end
end
