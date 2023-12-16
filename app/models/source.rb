# frozen_string_literal: true

class Source < ApplicationRecord
  belongs_to :user
  belongs_to :document, optional: true
  has_one_attached :file
  has_many :source_chunks, dependent: :destroy
  has_many :monitoring_events, as: :trackable, dependent: :nullify

  validates :name, presence: true
  validates :file, presence: true, unless: -> { fileless == true || source_url }
  validates :year_published, numericality: { only_integer: true }, length: { in: 0..4 }, allow_nil: true
  validate :file_type
  validates :source_url, format: { with: URI::DEFAULT_PARSER.make_regexp, message: 'is not a valid URL' },
                         if: lambda {
                               source_url.present?
                             }
  validate :source_url_leads_somewhere, if: -> { source_url.present? }
  validate :file_or_source_url, if: -> { fileless == false }
  validate :file_size_within_limit, if: -> { file.attached? && user.present? && file.changed? }

  after_create_commit :log_event
  after_create_commit :create_document

  after_create_commit :add_size_to_user_storage_used
  before_destroy :subtract_size_from_user_storage_used

  def clean_url
    source_url.present? ? source_url.gsub(%r{https+://(www.)+}, '') : ''
  end

  def add_size_to_user_storage_used
    user.update!(storage_used: user.storage_used + file_size)
  end

  def subtract_size_from_user_storage_used
    remaining_storage = user.storage_used - file_size
    user.update!(storage_used: remaining_storage.negative? ? 0 : remaining_storage)
  end

  def parse_source_chunks_from_file # rubocop:disable Metrics/MethodLength
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
    parse_source_chunks_from_text(raw_text)
  end

  def clear_chunks
    source_chunks.destroy_all
  end

  def parse_source_chunks_from_source_url
    text = Sources::UrlParser.new(source_url).parse_text
    parse_source_chunks_from_text(text)
  end

  def parse_source_chunks_from_text(raw_text)
    source_chunks.destroy_all
    Sources::SemanticChunker.new(self, raw_text).create_chunks
  end

  def rechunk
    update!(truncated: false)
    text = source_chunks.map(&:content).join(' ')
    parse_source_chunks_from_text(text)
  end

  private

  def create_document
    return if document.present?

    document = Document.create!(title: name, user_id:,
                                folder_id: (folder_id.presence || user.current_folder_id), source_based: true)
    update!(document_id: document.id)
  end

  def file_size_within_limit
    errors.add(:base, 'You do not have enough storage to upload this file.') if file_size > user.storage_available
  end

  def file_or_source_url
    errors.add(:base, 'Must have a file or source url') unless file.attached? || source_url
    errors.add(:base, 'Cannot have both a file and a source url') if file.attached? && source_url.present?
  end

  def source_url_leads_somewhere
    HTTParty.get(source_url)
  rescue Errno::ENETUNREACH, SocketError, Errno::ECONNREFUSED, Net::OpenTimeout
    errors.add(:source_url, 'does not respond.')
  end

  def log_event
    monitoring_events.create!(user_id: user&.id, note: "#{user&.email} created source #{name}",
                              event_type: 'create_record')
  end

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
