# frozen_string_literal: true

class AddTextCategoryToDocuments < ActiveRecord::Migration[7.0]
  def change
    add_column :documents, :text_category, :text
  end
end
