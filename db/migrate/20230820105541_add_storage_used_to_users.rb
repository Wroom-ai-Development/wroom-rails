# frozen_string_literal: true

class AddStorageUsedToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :storage_used, :bigint, default: 0, null: false
  end
end
