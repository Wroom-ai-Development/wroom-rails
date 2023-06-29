# frozen_string_literal: true

class AddNameToDocumentsAndConversations < ActiveRecord::Migration[7.0]
  def change
    add_column :documents, :name, :text, null: false, default: ''
    remove_index :documents, :title
    change_column_null :documents, :title, true
  end
end
