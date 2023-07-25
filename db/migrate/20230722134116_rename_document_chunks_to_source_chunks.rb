# frozen_string_literal: true

class RenameDocumentChunksToSourceChunks < ActiveRecord::Migration[7.0]
  def change
    rename_table :document_chunks, :source_chunks
  end
end
