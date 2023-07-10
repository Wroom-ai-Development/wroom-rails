# frozen_string_literal: true

class AddOnboardedToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :onboarded, :boolean
  end
end
