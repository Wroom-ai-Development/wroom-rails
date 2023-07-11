# frozen_string_literal: true

class TokenCounter
  def initialize(model)
    @tokenizer = Tiktoken.encoding_for_model(model)
  end

  def count_tokens(string)
    @tokenizer.encode(string).length
  end
end
