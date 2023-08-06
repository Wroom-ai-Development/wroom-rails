# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :confirmable, :validatable, password_length: 11..128

  VALID_PASSWORD_REGEX = /\A(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{11,}\z/
  validate :password_complexity

  has_many :sources, dependent: :destroy
  has_many :voices, dependent: :destroy
  has_many :documents, dependent: :destroy
  has_many :conversations, through: :documents
  has_many :monitoring_events, as: :trackable, dependent: :nullify
  has_many :usage_records, dependent: :nullify
  has_one :current_document, class_name: 'Document', dependent: :nullify
  validates :email, uniqueness: true, presence: true
  has_many :folders, dependent: :destroy
  has_one :root_folder, class_name: 'RootFolder', dependent: :destroy

  enum role: { 'admin': 0, 'user': 1, 'supplicant': 2 }
  after_initialize :set_default_role, if: :new_record?

  def password_complexity
    # Regexp extracted from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    return if password.blank? || password =~ VALID_PASSWORD_REGEX

    errors.add(:password,
               'must be at least 11 characters long and include at least one letter, one digit, and one special character (@ $ ! % * # ? &)') # rubocop:disable Layout/LineLength
  end

  def set_default_role
    self.role ||= :user
  end

  def anything_in_recycle_bin?
    documents.discarded.any? || voices.discarded.any? || folders.discarded.any?
  end

  def root_folder
    folders.where(type: 'RootFolder').first_or_create!(name: '/')
  end

  after_create_commit :log_event

  def reonboard
    documents.destroy_all
    folders.destroy_all
    voices.destroy_all
    create_welcome_records
  end

  def create_welcome_records
    create_welcome_document
    create_welcome_source
    create_welcome_voices
    update(onboarded: true)
  end

  private

  def log_event
    monitoring_events.create!(
      user_id: id,
      event_type: 'registration',
      note: "#{email} registered for wroom"
    )
  end

  def create_welcome_document
    documents.create!(title: 'Welcome to Wroom', folder: root_folder)
  end

  def create_welcome_source # rubocop:disable Metrics/MethodLength
    source = Source.create!(
      user_id: id,
      name: "'Sympathy' by Emily Brontë",
      fileless: true,
      title: 'Sympathy',
      author: 'Emily Brontë',
      year_published: '1846',
      text_category: 'poem',
      folder_id: root_folder.id
    )
    poem = <<-POEM
      There should be no despair for you
      While nightly stars are burning;
      While evening pours its silent dew,
      And sunshine gilds the morning.
      There should be no despair—though tears
      May flow down like a river:
      Are not the best beloved of years
      Around your heart for ever?

      They weep, you weep, it must be so;
      Winds sigh as you are sighing,
      And winter sheds its grief in snow
      Where Autumn’s leaves are lying:
      Yet, these revive, and from their fate
      Your fate cannot be parted:
      Then, journey on, if not elate,
      Still, NEVER broken-hearted!
    POEM
    source.parse_source_chunks_from_text(poem)
  end

  def create_welcome_voices
    new_voices = [
      ['Pirate', 'Speak like a pirate'],
      ['Worried mother', 'Speak like a mother who is constantly worried about her child.'],
      ['Hepcat', 'Speak like a hepcat']
    ]
    new_voices.each do |voice|
      voices.create(name: voice[0], meta_prompt: voice[1])
    end
  end
end
