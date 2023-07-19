# frozen_string_literal: true

class OpenaiService
  attr_accessor :client

  class ApiError < StandardError; end

  RETRY_LIMIT = 4

  def initialize
    @client = OpenAI::Client.new(access_token: ENV['OPENAI_ACCESS_KEY'])
  end

  def gpt_3_5_turbo(messages, max_tokens) # rubocop:disable Metrics/MethodLength
    retries = 0
    response = @client.chat(
      parameters: {
        model: 'gpt-3.5-turbo',
        messages:,
        max_tokens:
      }
    )
    handle_response(response)
  rescue ApiError => e
    retries += 1
    sleep 2**retries
    retries > RETRY_LIMIT ? raise(e) : retry
  end

  def gpt_4(messages, max_tokens) # rubocop:disable Metrics/MethodLength
    retries = 0
    response = @client.chat(
      parameters: {
        model: 'gpt-4',
        messages:,
        max_tokens:
      }
    )
    handle_response(response)
  rescue ApiError => e
    retries += 1
    sleep 2**retries
    retries > RETRY_LIMIT ? raise(e) : retry
  end

  def gpt_3_5_turbo_16k(messages, max_tokens) # rubocop:disable Metrics/MethodLength
    retries = 0
    response = @client.chat(
      parameters: {
        model: 'gpt-3.5-turbo-16k',
        messages:,
        max_tokens:
      }
    )
    handle_response(response)
  rescue ApiError => e
    retries += 1
    sleep 2**retries
    raise(e) if retries > RETRY_LIMIT

    retry
  end

  private

  def handle_response(response)
    raise ApiError, response['error'] if response['error'].present?

    response.dig('choices', 0, 'message', 'content')
  end
end
