# frozen_string_literal: true

class AddFolderIdToWroomProjects < ActiveRecord::Migration[7.0]
  def change
    add_reference :wroom_projects, :folder, foreign_key: true
    WroomProject.all.each do |wroom_project|
      wroom_project.update(folder_id: wroom_project.user.root_folder.id)
    end
  end
end
