# frozen_string_literal: true

class DocumentChunk < ApplicationRecord
  belongs_to :document
  validates :content, presence: true
  validates :order, presence: true

  after_create_commit :broadcast_status

  include PgSearch::Model
  pg_search_scope :search,
                  against: { content: 'A', section_header: 'B' },
                  using: {
                    tsearch: {
                      dictionary: 'english', tsvector_column: 'searchable'
                    }
                  }

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
