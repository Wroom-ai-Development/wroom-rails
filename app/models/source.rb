# frozen_string_literal: true

class Source < ApplicationRecord
  belongs_to :user
  has_one_attached :file
  has_many :context_references, dependent: :destroy
  has_many :conversations, through: :context_references
  has_many :document_chunks, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :user_id }
  validates :file, presence: true
  validates :year_published, numericality: { only_integer: true }, length: { in: 0..4 }, allow_nil: true
  validate :file_type

  def parse_document_chunks_from_file
    raw_text = if file.content_type == 'application/pdf'
                 Sources::PdfParser.new(file).parse_text
               elsif file.content_type == 'text/plain'
                 file.download
               end
    SourceChunkingWorker.perform_async(id, raw_text)
  end

  private

  def file_type
    return unless file.attached?

    return if file.content_type.in?(%w[text/plain application/pdf])

    errors.add(:file, 'must be a .pdf or .txt')
  end
end
