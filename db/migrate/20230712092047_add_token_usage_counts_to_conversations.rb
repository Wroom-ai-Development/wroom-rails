# frozen_string_literal: true

class AddTokenUsageCountsToConversations < ActiveRecord::Migration[7.0]
  def change
    add_column :conversations, :gpt_4_tokens_used, :bigint
    add_column :conversations, :gpt_3_5_turbo_tokens_used, :bigint
    add_column :conversations, :gpt_3_5_turbo_16k_tokens_used, :bigint
    Conversation.all.each do |c|
      c.update!(
        gpt_4_tokens_used: 0,
        gpt_3_5_turbo_tokens_used: 0,
        gpt_3_5_turbo_16k_tokens_used: 0
      )
    end
  end
end
