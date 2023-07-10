# frozen_string_literal: true

class OpenaiService
  attr_accessor :client

  RETRY_LIMIT = 4

  def initialize
    @client = OpenAI::Client.new(access_token: ENV['OPENAI_ACCESS_KEY'])
  end

  def gpt_3_5_turbo(messages) # rubocop:disable Metrics/MethodLength
    retries = 0
    @client.chat(
      parameters: {
        model: 'gpt-3.5-turbo',
        messages:
      }
    ).dig('choices', 0, 'message', 'content')
  rescue StandardError => e
    retries += 1
    sleep 2**retries
    retries > RETRY_LIMIT ? raise(e) : retry
  end

  def gpt_3_5_turbo_16k(messages) # rubocop:disable Metrics/MethodLength
    retries = 0
    @client.chat(
      parameters: {
        model: 'gpt-3.5-turbo-16k',
        messages:
      }
    ).dig('choices', 0, 'message', 'content')
  rescue StandardError => e
    retries += 1
    sleep 2**retries
    retries > RETRY_LIMIT ? raise(e) : retry
  end
end
