# frozen_string_literal: true

class TokenUsageService
  def initialize(user, conversation, model)
    @user = user
    @conversation = conversation
    @model = model
    @token_counter = TokenCounter.new(model)
  end

  def persist_token_usage(messages, response)
    input_token_count = count_tokens_in_messages(messages)
    output_token_count = @token_counter.count_tokens(response)
    @user.update!(tokens_used: @user.tokens_used + input_token_count + output_token_count)

    persist_usage_record(input_token_count, output_token_count)
  end

  private

  def count_tokens_in_messages(messages)
    full_text = messages.map { |m| m[:content] }.join(' ')
    @token_counter.count_tokens(full_text)
  end

  def persist_usage_record(input_token_count, output_token_count) # rubocop:disable Metrics/MethodLength
    case @model
    when 'gpt-3.5-turbo'
      @user.usage_records.create!(
        conversation: @conversation,
        gpt_3_5_turbo_input_tokens: input_token_count,
        gpt_3_5_turbo_output_tokens: output_token_count
      )
    when 'gpt-4'
      @user.usage_records.create!(
        conversation: @conversation,
        gpt_4_input_tokens: input_token_count,
        gpt_4_output_tokens: output_token_count
      )
    when 'gpt-3.5-turbo-16k'
      @user.usage_records.create!(
        conversation: @conversation,
        gpt_3_5_turbo_16k_input_tokens: input_token_count,
        gpt_3_5_turbo_16k_output_tokens: output_token_count
      )
    end
  end
end
