# frozen_string_literal: true

class AddUrlToSources < ActiveRecord::Migration[7.0]
  def change
    add_column :sources, :source_url, :string
  end
end
