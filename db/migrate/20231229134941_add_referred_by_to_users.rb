# frozen_string_literal: true

class AddReferredByToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :referred_by, :integer, default: nil
  end
end
