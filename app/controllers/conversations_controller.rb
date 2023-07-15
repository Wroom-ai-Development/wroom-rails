# frozen_string_literal: true

class ConversationsController < ApplicationController
  before_action :set_conversation,
                only: %i[edit_frame update_from_frame show_in_frame
                         new_user_message_from_frame]

  def show_in_frame; end

  def new_user_message_from_frame
    @conversation.update!(status: 1)
    @conversation.messages.where(role: 'error').destroy_all
    @conversation.messages.create!(content: params[:content], role: 'user')
    AnswerFetchingWorker.perform_async(@conversation.id)
    redirect_to root_path(project_id: @conversation.project_id), status: :see_other
  end

  def delete_message_from_frame
    message = Message.find(params[:message_id])
    conversation = message.conversation

    authorize! :edit, conversation
    message.destroy
    redirect_to root_path, status: :see_other
  end

  def edit_frame; end

  def update_from_frame
    @conversation.update(conversation_params)
    redirect_to root_path(project_id: @conversation.project_id), status: :see_other
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_conversation
    @conversation = Conversation.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def conversation_params
    params.require(:conversation).permit(:title, :user_id, source_ids: [], voice_ids: [])
  end
end
