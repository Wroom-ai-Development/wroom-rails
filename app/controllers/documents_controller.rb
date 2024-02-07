# frozen_string_literal: true

class DocumentsController < ApplicationController
  before_action :set_document,
                only: %i[editor destroy autosave undiscard discard]
  load_and_authorize_resource

  def editor # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    ether = EtherpadLite.connect(9001, File.new('/Users/marcelwojdylo/wroom/etherpad-lite/APIKEY.txt'))
    if current_user.personal_etherpad_group_id.blank?
      group_id = ether.create_group.id
      current_user.update!(personal_etherpad_group_id: group_id)
    end
    group = ether.get_group(current_user.personal_etherpad_group_id)
    binding.pry
    @document = if params[:id].present?
                  Document.find(params[:id])
                else
                  current_user.documents.first
                end
    @conversation = @document.conversation
    @document.folder.parents.reverse.each do |parent|
      breadcrumbs << Breadcrumb.new(parent.name, folder_path(parent))
    end
    # binding.pry
    breadcrumbs << Breadcrumb.new(@document.folder.name, folder_path(@document.folder))
    breadcrumbs << Breadcrumb.new(@document.truncated_title(40), editor_document_path(@document))
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

  def duplicate # rubocop:disable Metrics/AbcSize, Metrics/MethodLength, Metrics/CyclomaticComplexity
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
    conversation.voice = @document.conversation.voice if @document.conversation.voice.present?
    conversation.save!
    if @document.conversation.context_references.present?
      @document.conversation.context_references.each do |reference|
        ContextReference.create!(document_id: reference.document_id, conversation_id: conversation.id)
      end
    end
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
