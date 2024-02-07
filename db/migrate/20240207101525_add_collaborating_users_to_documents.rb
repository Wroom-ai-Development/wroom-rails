# frozen_string_literal: true

class AddCollaboratingUsersToDocuments < ActiveRecord::Migration[7.0]
  def change
    add_reference :documents, :collaborating_users, array: true, default: []
    add_column :documents, :etherpad_pad_id, :string
  end
end
