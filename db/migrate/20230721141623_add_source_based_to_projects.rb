# frozen_string_literal: true

class AddSourceBasedToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :source_based, :boolean, null: false, default: false
  end
end
