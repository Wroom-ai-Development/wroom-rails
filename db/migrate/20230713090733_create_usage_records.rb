# frozen_string_literal: true

class CreateUsageRecords < ActiveRecord::Migration[7.0]
  def up # rubocop:disable Metrics/MethodLength
    create_table :usage_records, &:timestamps
    add_column :usage_records, :gpt_4_output_tokens, :bigint, null: false, default: 0
    add_column :usage_records, :gpt_4_input_tokens, :bigint, null: false, default: 0
    add_column :usage_records, :gpt_3_5_turbo_input_tokens, :bigint, null: false, default: 0
    add_column :usage_records, :gpt_3_5_turbo_output_tokens, :bigint, null: false, default: 0
    add_column :usage_records, :gpt_3_5_turbo_16k_output_tokens, :bigint, null: false, default: 0
    add_column :usage_records, :gpt_3_5_turbo_16k_input_tokens, :bigint, null: false, default: 0
    add_reference :usage_records, :user
    add_reference :usage_records, :conversation
    remove_column :conversations, :gpt_4_tokens_used
    remove_column :conversations, :gpt_3_5_turbo_tokens_used
    remove_column :conversations, :gpt_3_5_turbo_16k_tokens_used
  end

  def down
    drop_table :usage_records
    add_column :conversations, :gpt_4_tokens_used, :bigint, default: 0, null: false
    add_column :conversations, :gpt_3_5_turbo_tokens_used, :bigint, default: 0, null: false
    add_column :conversations, :gpt_3_5_turbo_16k_tokens_used, :bigint, default: 0, null: false
  end
end
