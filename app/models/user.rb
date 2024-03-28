# frozen_string_literal: true

class User < ApplicationRecord # rubocop:disable Metrics/ClassLength
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :confirmable, :validatable, password_length: 11..128

  VALID_PASSWORD_REGEX = /\A(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()-_+=\[\]{}|;:',.<>?\/~`]{11,}\z/
  validate :password_complexity

  has_many :sources, dependent: :destroy
  has_many :voices, dependent: :destroy
  has_many :documents, dependent: :destroy
  has_many :conversations, through: :documents
  has_many :monitoring_events, as: :trackable, dependent: :nullify
  has_many :usage_records, dependent: :nullify
  has_one :current_document, class_name: 'Document', dependent: :nullify
  has_one :current_folder, class_name: 'Folder', dependent: :nullify
  validates :email, uniqueness: true, presence: true
  has_many :folders, dependent: :destroy
  has_one :root_folder, class_name: 'RootFolder', dependent: :destroy
  has_one :subscription, dependent: :destroy

  enum role: { 'admin': 0, 'user': 1, 'supplicant': 2 }
  after_initialize :set_default_role, if: :new_record?
  after_initialize :set_referral_code, if: :new_record?
  after_create :create_subscription
  after_create :make_security_updated

  def full_name
    if first_name.blank? && last_name.blank?
      email
    elsif first_name.blank?
      last_name
    elsif last_name.blank?
      first_name
    else
      'Wroom User'
    end
  end

  def clear_subscription!
    return if subscription.blank?

    subscription.update(
      stripe_subscription_id: nil,
      paid_until: nil,
      plan: 'free',
      cancelled: false,
      paid: false
    )
  end

  def total_gpt_cost
    usage_records.sum(&:total_price)
  end

  def active_plan
    subscription.plan
  end

  def gpt_fees_limit
    base_limit = case subscription.plan # rubocop:disable Style/HashLikeCase
                 when 'free'
                   5.0
                 when 'basic'
                   15.0
                 when 'pro'
                   50.0
                 end
    base_limit + bonus_gpt_budget
  end

  def gpt_fees_incurred
    usage_records.kept.sum(&:total_price)
  end

  def gpt_budget_available
    difference = gpt_fees_limit - gpt_fees_incurred
    difference.positive? ? difference : 0
  end

  def percentage_gpt_fees_available
    gpt_budget_available / gpt_fees_limit * 100.0
  end

  def password_complexity
    # Regexp extracted from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    return if password.blank? || password =~ VALID_PASSWORD_REGEX

    errors.add(:password,
               'must be at least 11 characters long and include at least one letter and one digit')
  end

  def set_default_role
    self.role ||= :user
  end

  def set_referral_code
    charset = ('A'..'Z').to_a + (0..9).to_a
    code = Array.new(8) { charset.sample }.join + id.to_s
    update(referral_code: code)
  end

  def anything_in_recycle_bin?
    documents.discarded.any? || voices.discarded.any? || folders.discarded.any?
  end

  def root_folder
    folders.where(type: 'RootFolder').first_or_create!(name: '/')
  end

  def upload_storage_limit
    case subscription.plan
    when 'free'
      200.megabytes
    when 'basic'
      25.gigabytes
    when 'pro'
      100.gigabytes
    end
  end

  def storage_available
    difference = upload_storage_limit - storage_used
    difference.positive? ? difference : 0
  end

  def total_storage
    upload_storage_limit
  end

  def percent_storage_used
    storage_used / upload_storage_limit.to_f * 100
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

  def self.ransackable_associations(_auth_object = nil)
    %w[conversations current_document current_folder documents folders monitoring_events root_folder
       sources subscription usage_records voices]
  end

  def self.ransackable_attributes(_auth_object = nil)
    %w[confirmation_sent_at confirmation_token confirmed_at created_at current_document_id
       current_folder_id email encrypted_password first_name gpt_4_enabled id last_name onboarded remember_created_at reset_password_sent_at reset_password_token role security_updated storage_used subscription_id tokens_used updated_at] # rubocop:disable Layout/LineLength
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

  def create_subscription
    Subscription.create!(user: self, plan: 'free')
  end

  def make_security_updated
    update(security_updated: true)
  end
end
