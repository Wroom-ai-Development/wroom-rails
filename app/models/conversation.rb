# frozen_string_literal: true

class Conversation < ApplicationRecord
  belongs_to :user
  has_many :messages, dependent: :destroy
  has_many :context_references, dependent: :destroy
  has_many :documents, through: :context_references
  validates :title, presence: true

  enum role: { 'ready': 0, 'working': 1, 'idle': 2, 'error': 3 }
end
