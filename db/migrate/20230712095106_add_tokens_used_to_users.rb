# frozen_string_literal: true

class AddTokensUsedToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :tokens_used, :bigint, default: 0
  end
end
