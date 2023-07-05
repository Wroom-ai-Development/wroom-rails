# frozen_string_literal: true

class DocumentsController < ApplicationController
  before_action :set_document, only: %i[edit_frame edit update destroy autosave save_as_source destroy_from_frame save_as_source_from_frame]
  load_and_authorize_resource

  # GET /documents or /documents.json

  def documents_frame
    @documents = current_user.documents.order(:created_at)
  end

  def new_frame
    @document = Document.new
  end

  def create_from_frame
    conversation_title = (document_params[:title].presence || 'Document Conversation')
    conversation = Conversation.create!(
      title: conversation_title,
      user_id: document_params[:user_id]
    )
    @document = Document.new(document_params)
    @document.conversation_id = conversation.id
    @document.save
    redirect_to root_path, status: :see_other
  end

  def destroy_from_frame
    @document.destroy
    redirect_to root_path, status: :see_other
  end

  def edit_frame
    @document = if params[:id].present?
      Document.find(params[:id])
    else
      current_user.documents.first
    end
    @conversation = @document.conversation
  end

  def save_as_source_from_frame
    source = Source.create!(
      user_id: @document.user_id,
      name: @document.title,
      from_document: true,
      title: @document.title
    )
    source.parse_document_chunks_from_text(@document.content.to_plain_text)
    redirect_to root_path, status: :see_other
  end





  def index
    @documents = Document.all
    @users = User.where.not(id: current_user.id) if current_user.admin?
  end

  # GET /documents/new
  def new
    @document = Document.new
  end


  

  # GET /documents/1/edit
  def edit
    @in_document_editor = true
  end

  def autosave
    @document.assign_attributes(document_params)
    @document.save!
    head :ok
  end

  def save_as_source
    source = Source.create!(
      user_id: @document.user_id,
      name: @document.title,
      from_document: true,
      title: @document.title
    )
    source.parse_document_chunks_from_text(@document.content.to_plain_text)
    respond_to do |format|
      format.html { redirect_to source, notice: 'Document was successfully created.' }
    end
  end

  # POST /documents or /documents.json
  def create # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    conversation_title = (document_params[:title].presence || 'Document Conversation')
    conversation = Conversation.create!(
      title: conversation_title,
      user_id: document_params[:user_id]
    )
    @document = Document.new(document_params)
    @document.conversation_id = conversation.id
    respond_to do |format|
      if @document.save
        format.html { head :ok }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /documents/1 or /documents/1.json
  def update
    respond_to do |format|
      if @document.update(document_params)
        format.html { redirect_to edit_document_url(@document), notice: 'Document was successfully updated.' }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /documents/1 or /documents/1.json
  def destroy
    @document.destroy

    respond_to do |format|
      format.html { redirect_to documents_url, notice: 'Document was successfully destroyed.' }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_document
    @document = Document.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def document_params
    params.require(:document).permit(:title, :content, :user_id)
  end
end
