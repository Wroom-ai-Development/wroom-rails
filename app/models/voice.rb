# frozen_string_literal: true

class Voice < ApplicationRecord
  belongs_to :user
  has_many :conversation_voices, dependent: :destroy
  has_many :conversations, through: :conversation_voices
  validates :name, presence: true
end
