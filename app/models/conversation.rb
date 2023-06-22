# frozen_string_literal: true

class Conversation < ApplicationRecord
  belongs_to :user
  has_many :messages, dependent: :destroy
  has_many :context_references, dependent: :destroy
  has_many :documents, through: :context_references
end
