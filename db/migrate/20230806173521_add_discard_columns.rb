# frozen_string_literal: true

class AddDiscardColumns < ActiveRecord::Migration[7.0]
  def change
    add_column :documents, :discarded_at, :datetime
    add_index :documents, :discarded_at
    add_column :folders, :discarded_at, :datetime
    add_index :folders, :discarded_at
    add_column :voices, :discarded_at, :datetime
    add_index :voices, :discarded_at
    add_column :messages, :discarded_at, :datetime
    add_index :messages, :discarded_at
  end
end
