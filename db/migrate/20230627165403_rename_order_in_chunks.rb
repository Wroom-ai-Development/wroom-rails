class RenameOrderInChunks < ActiveRecord::Migration[7.0]
  def change
    rename_column :document_chunks, :order, :ordinal_number
  end
end
