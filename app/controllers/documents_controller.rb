# frozen_string_literal: true

class DocumentsController < ApplicationController
  before_action :set_document,
                only: %i[editor destroy autosave undiscard discard]
  load_and_authorize_resource

  def editor
    @document = if params[:id].present?
                  Document.find(params[:id])
                else
                  current_user.documents.first
                end
    @conversation = @document.conversation
  end

  def index
    @documents = Document.kept
    @users = User.where.not(id: current_user.id) if current_user.admin?
  end

  def undiscard
    @document.undiscard
    redirect_to wroom_path(document_id: @document.id)
  end

  # GET /documents/new
  def new
    @document = Document.create!(
      title: 'Untitled',
      content: '',
      user_id: current_user.id,
      folder_id: current_user.current_folder_id || current_user.root_folder.id
    )
    redirect_to wroom_path(document_id: @document.id)
  end

  def autosave
    @document.assign_attributes(document_params)
    @document.save!
    head :ok
  end

  def duplicate # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    @document = Document.find(params[:id])
    duplicate = @document.dup
    duplicate.cloned_from = @document.id
    duplicate.content = @document.content
    duplicate.save!
    conversation = @document.conversation.dup
    if @document.conversation.messages.present?
      @document.conversation.messages.each do |message|
        conversation.messages << message.dup
      end
    end
    if @document.conversation.voice.present?
      conversation.voice = @document.conversation.voice
    end
    conversation.save!
    duplicate.conversation = conversation
    duplicate.save!
    if @document.source.present?
      source = @document.source.dup
      @document.source.source_chunks.each do |chunk|
        source.source_chunks << chunk.dup
      end
      source.file.attach @document.source.file.blob
      source.save!
      duplicate.source = source
      duplicate.save!
    end
    @document.update_storage_bar
    head :no_content
  end

  def discard
    @document.discard
    current_user.update!(current_document_id: nil) if current_user.current_document_id == @document.id
    head :no_content
  end

  # DELETE /documents/1 or /documents/1.json
  def destroy
    @document.destroy
    head :no_content
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_document
    @document = Document.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def document_params
    params.require(:document).permit(:title, :content, :user_id, :folder_id)
  end
end
