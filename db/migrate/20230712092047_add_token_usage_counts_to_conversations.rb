# frozen_string_literal: true

class AddTokenUsageCountsToConversations < ActiveRecord::Migration[7.0]
  def change
    add_column :conversations, :gpt_4_tokens_used, :bigint, default: 0, null: false
    add_column :conversations, :gpt_3_5_turbo_tokens_used, :bigint, default: 0, null: false
    add_column :conversations, :gpt_3_5_turbo_16k_tokens_used, :bigint, default: 0, null: false
  end
end
