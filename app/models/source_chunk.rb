# frozen_string_literal: true

class SourceChunk < ApplicationRecord
  belongs_to :source
  validates :content, presence: true
  validates :ordinal_number, presence: true

  def save_token_count
    update!(token_length: Tiktoken.encoding_for_model('gpt-4').encode(content).length)
  end
end
