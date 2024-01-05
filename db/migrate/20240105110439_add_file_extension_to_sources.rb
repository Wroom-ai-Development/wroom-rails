# frozen_string_literal: true

class AddFileExtensionToSources < ActiveRecord::Migration[7.0]
  def change
    add_column :sources, :file_extension, :string, null: false, default: ''
  end
end
