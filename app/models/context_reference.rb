# frozen_string_literal: true

class ContextReference < ApplicationRecord
  belongs_to :conversation
  belongs_to :document

  after_create :announce_change
  after_destroy :announce_change

  private

  def announce_change
    broadcast_replace_to(
      conversation.id,
      'conversation_context',
      partial: 'conversations/tree_document',
      locals: {
        conversation:,
        document:
      },
      target: "tree-document-#{document.id}"
    )
  end
end
