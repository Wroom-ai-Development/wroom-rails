# frozen_string_literal: true

class UsageRecord < ApplicationRecord
  include Discard::Model

  belongs_to :user
  belongs_to :conversation

  GPT_4_INPUT_PRICE_PER_1000_TOKENS = 0.03
  GPT_4_OUTPUT_PRICE_PER_1000_TOKENS = 0.06
  GPT_3_5_TURBO_16K_INPUT_PRICE_PER_1000_TOKENS = 0.001
  GPT_3_5_TURBO_16K_OUTPUT_PRICE_PER_1000_TOKENS = 0.002
  GPT_3_5_TURBO_INPUT_PRICE_PER_1000_TOKENS = 0.0015
  GPT_3_5_TURBO_OUTPUT_PRICE_PER_1000_TOKENS = 0.002

  def total_price
    gpt_4_price + gpt_3_5_turbo_16k_price + gpt_3_5_turbo_price
  end

  def gpt_4_price
    gpt_4_input_price + gpt_4_output_price
  end

  def gpt_4_input_price
    gpt_4_input_tokens / 100.0 * GPT_4_INPUT_PRICE_PER_1000_TOKENS
  end

  def gpt_4_output_price
    gpt_4_output_tokens / 100.0 * GPT_4_OUTPUT_PRICE_PER_1000_TOKENS
  end

  def gpt_3_5_turbo_16k_price
    gpt_3_5_turbo_16k_input_price + gpt_3_5_turbo_16k_output_price
  end

  def gpt_3_5_turbo_16k_input_price
    gpt_3_5_turbo_16k_input_tokens / 100.0 * GPT_3_5_TURBO_16K_INPUT_PRICE_PER_1000_TOKENS
  end

  def gpt_3_5_turbo_16k_output_price
    gpt_3_5_turbo_16k_output_tokens / 100.0 * GPT_3_5_TURBO_16K_OUTPUT_PRICE_PER_1000_TOKENS
  end

  def gpt_3_5_turbo_price
    gpt_3_5_turbo_input_price + gpt_3_5_turbo_output_price
  end

  def gpt_3_5_turbo_input_price
    gpt_3_5_turbo_input_tokens / 100.0 * GPT_3_5_TURBO_INPUT_PRICE_PER_1000_TOKENS
  end

  def gpt_3_5_turbo_output_price
    gpt_3_5_turbo_output_tokens / 100.0 * GPT_3_5_TURBO_OUTPUT_PRICE_PER_1000_TOKENS
  end

  def self.ransackable_attributes(auth_object = nil)
    ["conversation_id", "created_at", "discarded_at", "gpt_3_5_turbo_16k_input_tokens", "gpt_3_5_turbo_16k_output_tokens", "gpt_3_5_turbo_input_tokens", "gpt_3_5_turbo_output_tokens", "gpt_4_input_tokens", "gpt_4_output_tokens", "id", "updated_at", "user_id"]
  end
end
