# frozen_string_literal: true

class OpenaiService
  attr_accessor :client

  class ApiError < StandardError; end
  class TokenRateLimitExceeded < ApiError; end
  class RequestRateLimitExceeded < ApiError; end
  class ModelDoesNotExist < ApiError; end

  RETRY_LIMIT = 4

  def initialize
    @client = OpenAI::Client.new(access_token: ENV['OPENAI_ACCESS_KEY'])
  end

  def haiku_about_new_venture
    chat_completion([{
                      role: 'user',
                      content: 'Write a haiku about starting a new venture.'
                    }],
                    'gpt-3.5-turbo', 1000)
  end

  def chat_completion(messages, model, max_tokens) # rubocop:disable Metrics/MethodLength
    retries = 0
    response = @client.chat(
      parameters: {
        model:,
        messages:,
        max_tokens:
      }
    )
    # binding.pry
    # log respn
    handle_response(response)
  rescue TokenRateLimitExceeded, RequestRateLimitExceeded => e
    retries += 1
    sleep 2**retries
    retries > RETRY_LIMIT ? raise(e) : retry
  end

  private

  def handle_response(response) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
    if response['error'].present?
      case response['error']['code']
      when 'model_not_found'
        raise ModelDoesNotExist, response['error']['message']
      when 'rate_limit_exceeded'
        raise TokenRateLimitExceeded, response['error']['message'] if response['error']['type'] == 'tokens'

        raise RequestRateLimitExceeded, response['error']['message']

      end
    else
      response.dig('choices', 0, 'message', 'content')
    end
  end
end
