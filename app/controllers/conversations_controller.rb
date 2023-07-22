# frozen_string_literal: true

class ConversationsController < ApplicationController
  before_action :set_conversation,
                only: %i[settings update_settings chat
                         new_message clear_chat cancel_processing]

  def chat
    @conversation.user.conversations.where.not(id: @conversation.id).map(&:cancel_processing)
  end

  def new_message
    @conversation.update!(status: 1)
    @conversation.messages.where(role: 'error').destroy_all
    @conversation.messages.create!(content: params[:content], role: 'user')
    sidekiq_job_id = AnswerFetchingWorker.perform_async(@conversation.id)
    @conversation.update!(sidekiq_job_id:)
    redirect_to root_path(project_id: @conversation.project_id), status: :see_other
  end

  def delete_message
    message = Message.find(params[:message_id])
    conversation = message.conversation

    authorize! :edit, conversation
    message.destroy
    redirect_to root_path, status: :see_other
  end

  def cancel_processing
    @conversation.messages.last.destroy!
    @conversation.cancel_processing
    redirect_to root_path, status: :see_other
  end

  def clear_chat
    authorize! :edit, @conversation
    @conversation.messages.destroy_all
    redirect_to root_path, status: :see_other
  end

  def settings; end

  def update_settings
    @conversation.update(conversation_params)
    if params[:conversation][:voice_id].present?
      ConversationVoice.find_or_create_by!(conversation: @conversation, voice_id: params[:conversation][:voice_id])
    else
      @conversation.conversation_voice&.destroy
    end
    redirect_to root_path(project_id: @conversation.project_id), status: :see_other
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_conversation
    @conversation = Conversation.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def conversation_params
    params.require(:conversation).permit(:title, project_ids: [])
  end
end
