# frozen_string_literal: true

class RenameFromDocumentsInSources < ActiveRecord::Migration[7.0]
  def change
    rename_column :sources, :from_document, :fileless
  end
end
