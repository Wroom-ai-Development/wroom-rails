# frozen_string_literal: true

class Project < ApplicationRecord
  belongs_to :user
  belongs_to :wroom_project
  has_one :conversation, dependent: :destroy

  validates :title, presence: true
  has_rich_text :content
  has_many :monitoring_events, as: :trackable, dependent: :nullify

  after_create_commit :log_event

  private

  def log_event
    monitoring_events.create!(user_id: user&.id, note: "#{user&.email} created project #{title}",
                              event_type: 'create_record')
  end
end
