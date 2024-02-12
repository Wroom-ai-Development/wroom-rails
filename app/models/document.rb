# frozen_string_literal: true

class Document < ApplicationRecord
  include Discard::Model
  belongs_to :user
  belongs_to :folder
  has_one :source, dependent: :destroy
  has_one :conversation, dependent: :destroy
  has_many :context_references, dependent: :destroy
  has_many :documents, through: :context_references
  has_one :etherpad_group, dependent: :destroy

  validates :title, presence: true
  has_many :monitoring_events, as: :trackable, dependent: :nullify

  after_create_commit :log_event
  after_create_commit :create_conversation
  after_create_commit :broadcast_create
  after_create_commit :update_storage_bar
  after_create :initialize_etherpad
  after_discard :remove_document_row
  before_destroy :remove_document_row
  before_destroy :update_storage_bar
  after_discard :remove_from_sidebar
  after_save :remove_document_row, if: :saved_change_to_folder_id?

  def initialize_etherpad
    initialize_etherpad_group
    initialize_etherpad_pad
  end

  def initialize_etherpad_group
    return unless etherpad_group.nil?

    ether = EtherpadService.new.ether
    group = ether.create_group
    create_etherpad_group(group_id: group.id)
  end

  def initialize_etherpad_pad
    return unless etherpad_pad_id.nil?

    ether = EtherpadService.new.ether
    pad = ether.client.createGroupPad(
      groupID: etherpad_group.group_id,
      # TODO: Obscure document id in pad name
      padName: "wroom_document_#{id}",
      text: [''],
      authorId: [user.etherpad_author_id]
    )
    update!(etherpad_pad_id: pad[:padID])
  end

  def etherpad_pad_text_content
    return nil if etherpad_pad_id.nil?

    ether = EtherpadService.new.ether
    ether.get_pad(etherpad_pad_id).text.gsub(/[\t\n]+/, ' ')
  end

  def remove_from_sidebar
    broadcast_remove_to(
      user.id,
      'sidebar_explorer',
      target: "tree-document-#{id}"
    )
  end

  def truncated_title(length)
    if title.length <= length
      title
    else
      title.truncate(length, separator: ' ')
    end
  end

  def refresh_source
    Source.where(document_id: id).destroy_all
    source = Source.create!(name: title, user_id:, document_id: id, fileless: true)
    source.parse_source_chunks_from_text(etherpad_pad_text_content)
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

  def self.ransackable_attributes(_auth_object = nil)
    %w[cloned_from created_at discarded_at folder_id id source_based title updated_at user_id]
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
end
