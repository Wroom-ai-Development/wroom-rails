# frozen_string_literal: true

class Source < ApplicationRecord
  belongs_to :user
  has_one_attached :file
  has_many :context_references, dependent: :destroy
  has_many :conversations, through: :context_references
  has_many :document_chunks, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :user_id }
  validates :file, presence: true, unless: -> { from_document == true }
  validates :year_published, numericality: { only_integer: true }, length: { in: 0..4 }, allow_nil: true
  validate :file_type

  def parse_document_chunks_from_file # rubocop:disable Metrics/MethodLength
    raw_text = if file.content_type == 'application/pdf'
                 Sources::PdfParser.new(file).parse_text
               elsif file.content_type == 'text/plain'
                 file.download
               elsif file.content_type.in? %w[
                 application/msword
                 application/vnd.openxmlformats-officedocument.wordprocessingml.document
               ]
                 Sources::WordParser.new(file).parse_text
               end
    parse_document_chunks_from_text(raw_text)
  end

  def parse_document_chunks_from_text(raw_text)
    SourceChunkingWorker.perform_async(id, raw_text)
  end

  def rechunk
    update!(truncated: false)
    text = document_chunks.map(&:content).join(' ')
    if from_document
      parse_document_chunks_from_text(text)
    else
      parse_document_chunks_from_file
    end
  end

  private

  def file_type
    return unless file.attached?

    return if file.content_type.in?(%w[
                                      text/plain
                                      application/pdf
                                      application/msword
                                      application/vnd.openxmlformats-officedocument.wordprocessingml.document

                                    ])

    errors.add(:file, 'must be a .pdf,.docx or .txt')
  end
end
