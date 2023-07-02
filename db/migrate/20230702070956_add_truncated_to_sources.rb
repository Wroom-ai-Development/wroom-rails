# frozen_string_literal: true

class AddTruncatedToSources < ActiveRecord::Migration[7.0]
  def change
    add_column :sources, :truncated, :boolean, null: false, default: false
  end
end
