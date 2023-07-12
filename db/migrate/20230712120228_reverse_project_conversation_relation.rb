# frozen_string_literal: true

class ReverseProjectConversationRelation < ActiveRecord::Migration[7.0]
  def up
    add_column :conversations, :project_id, :bigint
    # add_column :projects, :conversation_id, :bigint
    Conversation.all.each do |conv|
      project = Project.where(conversation_id: conv.id).first
      if project
        conv.update!(project_id: project.id)
      else
        conv.destroy!
      end
    end
    remove_column :projects, :conversation_id
  end
end
