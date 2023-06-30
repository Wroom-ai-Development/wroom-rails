# frozen_string_literal: true

class RenameDocumentsToSources < ActiveRecord::Migration[7.0]
  def change
    rename_table :documents, :sources
    rename_column :document_chunks, :document_id, :source_id
    rename_column :context_references, :document_id, :source_id
  end
end
