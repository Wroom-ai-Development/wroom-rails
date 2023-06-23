# frozen_string_literal: true

class DocumentChunk < ApplicationRecord
  belongs_to :document
  validates :content, presence: true
  validates :order, presence: true
end
