# frozen_string_literal: true

class ContextReference < ApplicationRecord
  belongs_to :conversation
  belongs_to :document

  after_create :announce_create
  after_destroy :announce_destroy

  private

  # TODO: Inherit Turbo-related methods from a module
  def announce_create # rubocop:disable Metrics/MethodLength
    broadcast_replace_to(
      conversation.id,
      'conversation_context',
      partial: 'conversations/tree_document',
      locals: {
        conversation:,
        document:
      },
      target: "context-tree-document-#{document.id}"
    )
    broadcast_append_to(
      conversation.id,
      'conversation_context',
      partial: 'conversations/currently_selected_document',
      locals: {
        conversation:,
        document:
      },
      target: 'currently-selected-context-table'
    )
  end

  def announce_destroy # rubocop:disable Metrics/MethodLength
    broadcast_replace_to(
      conversation.id,
      'conversation_context',
      partial: 'conversations/tree_document',
      locals: {
        conversation:,
        document:
      },
      target: "context-tree-document-#{document.id}"
    )
    broadcast_remove_to(
      conversation.id,
      'conversation_context',
      target: "document-#{document.id}-context-row"
    )
  end
end
