# frozen_string_literal: true

class AddFromDocumentToSources < ActiveRecord::Migration[7.0]
  def change
    add_column :sources, :from_document, :boolean, null: false, default: false
  end
end
