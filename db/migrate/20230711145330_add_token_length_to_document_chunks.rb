# frozen_string_literal: true

class AddTokenLengthToDocumentChunks < ActiveRecord::Migration[7.0]
  def change
    add_column :document_chunks, :token_length, :bigint
  end
end
