# frozen_string_literal: true

class AddBonusTokensToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :bonus_gpt_budget, :integer, default: 0
  end
end
