# frozen_string_literal: true

class AddIndexToSearchableDocumentChunks < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!

  def change
    add_index :document_chunks, :searchable, using: :gin, algorithm: :concurrently
  end
end
