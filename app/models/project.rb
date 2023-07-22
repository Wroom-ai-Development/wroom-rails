# frozen_string_literal: true

class Project < ApplicationRecord
  belongs_to :user
  has_one :source, dependent: :destroy
  has_one :conversation, dependent: :destroy
  has_many :context_references, dependent: :destroy

  validates :title, presence: true
  has_rich_text :content
  has_many :monitoring_events, as: :trackable, dependent: :nullify

  after_create_commit :log_event
  after_create_commit :create_conversation

  def set_up_source
    source = Source.create!(name: title, user_id:, project_id: id, fileless: true)
    source.parse_document_chunks_from_text(content.to_plain_text)
  end

  private

  def log_event
    monitoring_events.create!(user_id: user&.id, note: "#{user&.email} created project #{title}",
                              event_type: 'create_record')
  end

  def create_conversation
    Conversation.create!(title:, project_id: id)
    ContextReference.create!(project_id: id, conversation_id: conversation.id)
  end
end
