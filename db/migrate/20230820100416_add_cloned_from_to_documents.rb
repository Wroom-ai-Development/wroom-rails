# frozen_string_literal: true

class AddClonedFromToDocuments < ActiveRecord::Migration[7.0]
  def change
    add_column :documents, :cloned_from, :integer, null: true
  end
end
