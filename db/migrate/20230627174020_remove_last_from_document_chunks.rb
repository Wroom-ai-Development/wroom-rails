# frozen_string_literal: true

class RemoveLastFromDocumentChunks < ActiveRecord::Migration[7.0]
  def up
    remove_column :document_chunks, :last
  end

  def down; end
end
