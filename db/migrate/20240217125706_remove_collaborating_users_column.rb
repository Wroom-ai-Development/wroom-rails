# frozen_string_literal: true

class RemoveCollaboratingUsersColumn < ActiveRecord::Migration[7.0]
  def change
    remove_reference :documents, :collaborating_users, array: true, default: []
  end
end
