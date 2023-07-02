# frozen_string_literal: true

class Voice < ApplicationRecord
  belongs_to :user
  has_many :conversation_voices, dependent: :destroy
  has_many :conversations, through: :conversation_voices
  has_many :monitoring_events, as: :trackable, dependent: :nullify
  validates :name, presence: true

  after_create_commit :log_event

  private

  def log_event
    monitoring_events.create!(user_id: user&.id, note: "#{user&.email} created voice #{name} at #{Time.zone.now}")
  end
end
