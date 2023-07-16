# frozen_string_literal: true

class CreateWroomProjects < ActiveRecord::Migration[7.0]
  def change # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
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
      user.voices.update_all(wroom_project_id: wroom_project.id) # rubocop:disable Rails/SkipsModelValidations
      user.sources.update_all(wroom_project_id: wroom_project.id) # rubocop:disable Rails/SkipsModelValidations
      user.projects.update_all(wroom_project_id: wroom_project.id) # rubocop:disable Rails/SkipsModelValidations
    end
  end
end
