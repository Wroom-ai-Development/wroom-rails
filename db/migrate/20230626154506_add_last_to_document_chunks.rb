# frozen_string_literal: true

class AddLastToDocumentChunks < ActiveRecord::Migration[7.0]
  def change
    add_column :document_chunks, :last, :boolean, default: false
  end
end
