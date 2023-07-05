# frozen_string_literal: true

class WroomController < ApplicationController
  layout 'wroom'

  def app
    @document = if params[:document_id].present?
      Document.find(params[:document_id])
    elsif current_user.documents.any?
      current_user.documents.first
    else
      conversation = Conversation.create!(user_id: current_user.id, title: 'Your first document')
      Document.create!(user_id: current_user.id, title: "Your first document", conversation_id: conversation.id)
    end
  end
end
