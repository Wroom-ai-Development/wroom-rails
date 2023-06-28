# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  has_many :documents, dependent: :destroy
  has_many :conversations, dependent: :destroy

  validates :email, uniqueness: true, presence: true

  enum role: { 'admin': 0, 'user': 1, 'supplicant': 2 }
  after_initialize :set_default_role, if: :new_record?

  def set_default_role
    self.role ||= :supplicant
  end
end
