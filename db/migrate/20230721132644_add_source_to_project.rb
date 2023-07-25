# frozen_string_literal: true

class AddSourceToProject < ActiveRecord::Migration[7.0]
  def change
    add_reference :sources, :project, index: true, foreign_key: true
  end
end
