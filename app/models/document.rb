# frozen_string_literal: true

class Document < ApplicationRecord
  include Discard::Model
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
  after_create_commit :broadcast_create
  after_discard :remove_document_row
  before_destroy :remove_document_row
  before_destroy :update_storage_bar
  after_discard :remove_from_sidebar
  after_save :remove_document_row, if: :saved_change_to_folder_id?

  def remove_from_sidebar
    broadcast_remove_to(
      user.id,
      'sidebar_explorer',
      target: "tree-document-#{id}"
    )
  end

  def refresh_source
    return if content.body.blank?

    Source.where(document_id: id).destroy_all
    source = Source.create!(name: title, user_id:, document_id: id, fileless: true)
    source.parse_source_chunks_from_text(content.body.to_plain_text)
  end

  def broadcast_create # rubocop:disable Metrics/MethodLength
    broadcast_after_to(
      user.id,
      'folder_documents',
      partial: 'folders/document_row',
      locals: { document: self, in_query: false },
      target: "document-row-#{cloned_from}"
    )
    broadcast_after_to(
      user.id,
      'sidebar_explorer',
      partial: 'folders/tree_document',
      locals: { document: self },
      target: "tree-document-#{cloned_from}"
    )
  end

  def update_storage_bar
    broadcast_replace_to(
      user.id,
      'storage-bar',
      partial: 'documents/storage_limit',
      locals: { user: },
      target: 'storage_bar'
    )
  end

  def remove_document_row
    broadcast_remove_to(
      user.id,
      'folder_documents',
      target: "document-row-#{id}"
    )
  end

  def path
    build_path(self)
  end

  private

  def build_path(document)
    if document.folder.parent && !document.folder.type == 'RootFolder'
      File.join(build_path(document.folder.parent), document.folder.name, document.title)
    else
      File.join('/', document.folder.name, document.title)
    end
  end

  def log_event
    monitoring_events.create!(user_id: user&.id, note: "#{user&.email} created document #{title}",
                              event_type: 'create_record')
  end

  def create_conversation
    Conversation.create!(title:, document_id: id)
    ContextReference.create!(document_id: id, conversation_id: conversation.id)
  end

  def self.ransackable_attributes(auth_object = nil)
    ["cloned_from", "created_at", "discarded_at", "folder_id", "id", "source_based", "title", "updated_at", "user_id"]
  end
end
