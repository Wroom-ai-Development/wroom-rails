class AddCurrentDocumentToUser < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :current_document
  end
end
