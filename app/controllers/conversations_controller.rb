# frozen_string_literal: true

class ConversationsController < ApplicationController
  before_action :set_conversation, only: %i[show edit update destroy new_user_message]
  load_and_authorize_resource except: [:delete_message]

  # GET /conversations or /conversations.json
  def index
    @users = User.where.not(id: current_user.id) if current_user.admin?
  end

  # GET /conversations/1 or /conversations/1.json
  def show
    return unless @conversation.status == 'ready'

    @conversation.update!(status: 2)
  end

  # GET /conversations/new
  def new
    @conversation = Conversation.new
  end

  def new_user_message
    @conversation.update!(status: 1)
    @conversation.messages.create!(content: params[:content], role: 'user')
    AnswerFetchingWorker.perform_async(@conversation.id)
    if params[:in_document_editor]
      redirect_to @conversation.documents.first
    else
      redirect_to @conversation
    end
  end

  def delete_message
    message = Message.find(params[:message_id])
    conversation = message.conversation
    authorize! :edit, conversation
    message.destroy
    if params[:in_document_editor]
      redirect_to conversation.documents.first
    else
      redirect_to conversation
    end
  end

  # GET /conversations/1/edit
  def edit; end

  # POST /conversations or /conversations.json
  def create
    @conversation = Conversation.new(conversation_params)

    respond_to do |format|
      if @conversation.save
        format.html { redirect_to conversation_url(@conversation), notice: 'Conversation was successfully created.' }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /conversations/1 or /conversations/1.json
  def update # rubocop:disable Metrics/MethodLength
    respond_to do |format|
      if @conversation.update(conversation_params)
        if @conversation.documents.any?
          format.html do
            redirect_to edit_document_url(@conversation.documents.first),
                        notice: 'Conversation was successfully updated.'
          end
        else
          format.html { redirect_to conversation_url(@conversation), notice: 'Conversation was successfully updated.' }
        end
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /conversations/1 or /conversations/1.json
  def destroy
    @conversation.destroy

    respond_to do |format|
      format.html { redirect_to conversations_url, notice: 'Conversation was successfully destroyed.' }
    end
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
