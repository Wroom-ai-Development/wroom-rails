# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

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

  def set_default_role
    self.role ||= :user
  end

  def root_folder
    folders.where(type: 'RootFolder').first_or_create!(name: 'Root')
  end

  after_create_commit :log_event

  private

  def log_event
    monitoring_events.create!(
      user_id: id,
      event_type: 'registration',
      note: "#{email} registered for wroom"
    )
  end
end
