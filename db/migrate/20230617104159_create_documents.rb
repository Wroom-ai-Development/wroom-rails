# frozen_string_literal: true

class CreateDocuments < ActiveRecord::Migration[7.0]
  def change
    create_table :documents do |t|
      t.string :title, null: false, index: { unique: true }
      t.text :notes
      t.string :author
      t.integer :year_published
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
