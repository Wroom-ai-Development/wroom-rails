# frozen_string_literal: true

class RemoveNotesFromDocuments < ActiveRecord::Migration[7.0]
  def up
    remove_column :documents, :notes
  end

  def down; end
end
