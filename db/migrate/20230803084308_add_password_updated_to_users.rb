# frozen_string_literal: true

class AddPasswordUpdatedToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :security_updated, :boolean, default: false, null: false
  end
end
