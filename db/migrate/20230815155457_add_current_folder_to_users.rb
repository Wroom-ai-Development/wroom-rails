class AddCurrentFolderToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :current_folder_id, :integer
  end
end
