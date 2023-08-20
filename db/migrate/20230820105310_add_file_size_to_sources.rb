class AddFileSizeToSources < ActiveRecord::Migration[7.0]
  def change
    add_column :sources, :file_size, :bigint, default: 0, null: false
  end
end
