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
    User.all.each do |user|
      wroom_project = user.wroom_projects.create(name: 'Previous resources')
      user.voices.update_all(wroom_project_id: wroom_project.id)
      user.sources.update_all(wroom_project_id: wroom_project.id)
      user.projects.update_all(wroom_project_id: wroom_project.id)
    end
  end
end
