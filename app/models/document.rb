# frozen_string_literal: true

class Document < ApplicationRecord
  belongs_to :user
  has_one_attached :file
  has_many :context_references, dependent: :destroy
  has_many :conversations, through: :context_references
  has_many :document_chunks, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :user_id }
  validates :file, presence: true
  validates :year_published, numericality: { only_integer: true }, length: { in: 0..4 }, allow_nil: true

  def parse_document_chunks_from_file
    raw_text = if file.content_type == 'application/pdf'
                 Documents::PdfParser.new(file).parse_text
               elsif file.content_type == 'text/plain'
                 file.download
               end
    DocumentChunkingWorker.perform_async(id, raw_text)
  end
end
