# frozen_string_literal: true

class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.integer :role, null: false
      t.text :content, null: false
      t.references :conversation, null: false, foreign_key: true

      t.timestamps
    end
  end
end
