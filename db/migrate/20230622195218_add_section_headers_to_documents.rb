# frozen_string_literal: true

class AddSectionHeadersToDocuments < ActiveRecord::Migration[7.0]
  def change
    add_column :documents, :section_headers, :text, array: true, default: []
  end
end
