# frozen_string_literal: true

class ConversationsController < ApplicationController
  before_action :set_conversation,
                only: %i[settings update_settings chat context toggle_context
                         new_message clear_chat cancel_processing clear_context]

  def chat
    # TODO: This cancels the processing of a user's conversations, except the current one
    # See if this hack is still necessary
    # If it is, move it to a service object or otherwise find a better way to handle it
    @conversation.user.conversations.where.not(id: @conversation.id).map(&:cancel_processing)
  end

  def context; end

  # TODO: Move this logic into the Conversation model
  def toggle_context # rubocop:disable Metrics/MethodLength
    @document = Document.find(params[:document_id])
    if @conversation.documents.include?(@document)
      ContextReference.where(
        conversation: @conversation,
        document: @document
      ).destroy_all
    else
      ContextReference.create!(
        conversation: @conversation,
        document: @document
      )
    end
    head :no_content
  end

  def clear_context
    @conversation.context_references.destroy_all # TODO: Make this a method on the Conversation model
    head :no_content
  end

  def new_message
    @conversation.update!(status: 1)
    @conversation.messages.create!(content: params[:content], role: 'user')
    sidekiq_job_id = AnswerFetchingWorker.perform_async(@conversation.id)
    @conversation.update!(sidekiq_job_id:)
    head :no_content
  end

  def delete_message
    message = Message.find(params[:message_id])
    conversation = message.conversation

    authorize! :edit, conversation
    message.discard
    head :no_content
  end

  def cancel_processing
    @conversation.messages.last.discard if @conversation.messages.any? && @conversation.messages.last.role == 'user'
    @conversation.cancel_processing
    head :no_content
  end

  def clear_chat
    authorize! :edit, @conversation
    @conversation.messages.each(&:discard)
    head :no_content
  end

  def settings; end

  def update_settings
    @conversation.update(conversation_params)
    if params[:conversation][:voice_id].present?
      ConversationVoice.find_or_create_by!(conversation: @conversation, voice_id: params[:conversation][:voice_id])
    else
      @conversation.conversation_voice&.destroy
    end
    head :no_content
  end

  private

  def set_conversation
    @conversation = Conversation.find(params[:id])
  end

  def conversation_params
    params.require(:conversation).permit(:title, document_ids: [])
  end
end
