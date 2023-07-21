# frozen_string_literal: true

class RemoveUsersReferenceFromConversations < ActiveRecord::Migration[7.0]
  def change
    remove_reference :conversations, :user, index: true, foreign_key: true
  end
end
