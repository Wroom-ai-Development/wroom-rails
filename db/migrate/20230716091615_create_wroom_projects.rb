# frozen_string_literal: true

class CreateWroomProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :wroom_projects do |t|
      t.string :name
      t.timestamps
    end
    add_reference :wroom_projects, :user, foreign_key: true
    add_reference :projects, :wroom_project, foreign_key: true
    add_reference :voices, :wroom_project, foreign_key: true
    add_reference :sources, :wroom_project, foreign_key: true
  end
end
