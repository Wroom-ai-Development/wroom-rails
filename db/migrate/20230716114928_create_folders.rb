# frozen_string_literal: true

class CreateFolders < ActiveRecord::Migration[7.0]
  def change # rubocop:disable Metrics/MethodLength
    create_table :folders do |t|
      t.string :name
      t.references :user, null: false, foreign_key: true
      t.references :parent, null: true, foreign_key: { to_table: :folders }
      t.string :type
      t.timestamps
    end
    add_reference :projects, :folder, foreign_key: true
    User.all.each do |user|
      root_folder = user.folders.create(name: 'Root', type: 'RootFolder')
      user.projects.update_all(folder_id: root_folder.id) # rubocop:disable Rails/SkipsModelValidations
    end
  end
end
