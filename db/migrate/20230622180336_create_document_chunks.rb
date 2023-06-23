# frozen_string_literal: true

class CreateDocumentChunks < ActiveRecord::Migration[7.0]
  def change
    create_table :document_chunks do |t|
      t.text :section_header
      t.text :content, null: false
      t.integer :order, null: false, default: 0
      t.references :document, null: false, foreign_key: true

      t.timestamps
    end
  end
end
