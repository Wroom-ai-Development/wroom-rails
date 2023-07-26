# frozen_string_literal: true

class Document < ApplicationRecord
  belongs_to :user
  belongs_to :folder
  has_one :source, dependent: :destroy
  has_one :conversation, dependent: :destroy
  has_many :context_references, dependent: :destroy
  has_many :documents, through: :context_references

  validates :title, presence: true
  has_rich_text :content
  has_many :monitoring_events, as: :trackable, dependent: :nullify

  after_create_commit :log_event
  after_create_commit :create_conversation

  def refresh_source
    return if content.body.blank?

    Source.where(document_id: id).destroy_all
    source = Source.create!(name: title, user_id:, document_id: id, fileless: true)
    source.parse_source_chunks_from_text(content.body.to_plain_text)
  end

  def icon
    source_based ? '📔' : '📄'
  end

  private

  def log_event
    monitoring_events.create!(user_id: user&.id, note: "#{user&.email} created document #{title}",
                              event_type: 'create_record')
  end

  def create_conversation
    Conversation.create!(title:, document_id: id)
    ContextReference.create!(document_id: id, conversation_id: conversation.id)
  end
end
