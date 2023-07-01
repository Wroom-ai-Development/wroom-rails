# frozen_string_literal: true

class ChangeDocumentContentTypeToJsonb < ActiveRecord::Migration[7.0]
  def change
    add_column :documents, :content, :jsonb
  end
end
