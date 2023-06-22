# frozen_string_literal: true

class CreateContextReferences < ActiveRecord::Migration[7.0]
  def change
    create_table :context_references do |t|
      t.references :conversation, null: false, foreign_key: true
      t.references :document, null: false, foreign_key: true

      t.timestamps
    end
  end
end
