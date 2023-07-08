class OpenaiService
  attr_accessor :client

  def initialize
    @client = OpenAI::Client.new(access_token: ENV['OPENAI_ACCESS_KEY'])
  end

  def gpt_3_5_turbo(messages)
    @client.chat(
      parameters: {
        model: 'gpt-3.5-turbo',
        messages: messages
      }
    ).dig('choices', 0, 'message', 'content')
  end

  def gpt_3_5_turbo_16k(messages)
    @client.chat(
      parameters: {
        model: 'gpt-3.5-turbo-16k',
        messages: messages
      }
    ).dig('choices', 0, 'message', 'content')
  end
end