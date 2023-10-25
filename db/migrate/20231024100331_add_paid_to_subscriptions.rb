# frozen_string_literal: true

class AddPaidToSubscriptions < ActiveRecord::Migration[7.0]
  def change
    add_column :subscriptions, :paid, :boolean, default: false
  end
end
