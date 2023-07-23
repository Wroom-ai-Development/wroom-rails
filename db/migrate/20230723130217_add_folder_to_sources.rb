# frozen_string_literal: true

class AddFolderToSources < ActiveRecord::Migration[7.0]
  def change
    add_reference :sources, :folder, foreign_key: true
  end
end
