# frozen_string_literal: true

class DocumentChunk < ApplicationRecord
  belongs_to :document
  validates :content, presence: true
  validates :ordinal_number, presence: true

  after_create_commit :broadcast_status

  private

  def broadcast_status
    broadcast_replace_to(
      document.id,
      'chunking_status',
      partial: 'documents/chunking_status',
      locals: { chunk: self },
      target: 'chunking_status'
    )
  end
end
