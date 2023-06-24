# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :conversation
  validates :content, presence: true
  enum role: { 'user': 0, 'assistant': 1, 'system': 2, 'error': 3 }
end
