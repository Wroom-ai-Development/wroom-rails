# frozen_string_literal: true

class CreateDocumentCollaborations < ActiveRecord::Migration[7.0]
  def change
    create_table :document_collaborations do |t|
      t.references :document, foreign_key: true
      t.references :user, foreign_key: true
      t.timestamps
    end
    add_index :document_collaborations, %i[document_id user_id], unique: true
  end
end
