# frozen_string_literal: true

class RemoveContentFromDocumentChunks < ActiveRecord::Migration[7.0]
  def up
    remove_column :document_chunks, :content
  end

  def down
    add_column :document_chunks, :content, :text
  end
end
