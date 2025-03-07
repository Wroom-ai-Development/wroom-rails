# frozen_string_literal: true

class Voice < ApplicationRecord
  include Discard::Model
  belongs_to :user
  has_many :conversation_voices, dependent: :destroy
  has_many :conversations, through: :conversation_voices
  has_many :monitoring_events, as: :trackable, dependent: :nullify
  validates :name, presence: true

  after_create_commit :announce_create
  after_update_commit :announce_update
  after_discard :announce_destroy

  def self.ransackable_attributes(_auth_object = nil)
    %w[created_at discarded_at id meta_prompt name updated_at user_id]
  end

  private

  def announce_destroy
    broadcast_remove_to 'voices', target: "voice-row-#{id}"
    broadcast_remove_to 'voices', target: "editor-#{id}"
  end

  def announce_update
    broadcast_replace_to 'voices', partial: 'voices/voice', locals: { voice: self }, target: "voice-row-#{id}"
  end

  def announce_create
    broadcast_after_to 'voices', partial: 'voices/voice', locals: { voice: self }, target: 'new-voices-marker'
    monitoring_events.create!(user_id: user&.id, note: "#{user&.email} created voice #{name}",
                              event_type: 'create_record')
  end
end
