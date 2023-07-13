# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  has_many :sources, dependent: :destroy
  has_many :conversations, dependent: :destroy
  has_many :voices, dependent: :destroy
  has_many :projects, dependent: :destroy
  has_many :monitoring_events, as: :trackable, dependent: :nullify
  has_many :usage_records, dependent: :nullify
  has_one :current_project, class_name: 'Project', dependent: :nullify
  validates :email, uniqueness: true, presence: true

  enum role: { 'admin': 0, 'user': 1, 'supplicant': 2 }
  after_initialize :set_default_role, if: :new_record?

  def set_default_role
    self.role ||= :user
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
