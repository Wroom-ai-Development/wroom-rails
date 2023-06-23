# frozen_string_literal: true

class Document < ApplicationRecord
  belongs_to :user
  validates :title, presence: true, uniqueness: true
  validates :file, presence: true
  has_one_attached :file
  has_many :context_references, dependent: :destroy
  has_many :conversations, through: :context_references
  has_many :document_chunks, dependent: :destroy

  def parse_document_chunks_from_file
    raw_text = if file.content_type == 'application/pdf'
                 Documents::PdfParser.new(file).parse_text
               elsif file.content_type == 'text/plain'
                 file.download
               end
    Documents::SemanticChunker.new(self, raw_text).create_chunks
  end
end
