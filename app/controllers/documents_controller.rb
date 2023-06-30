# frozen_string_literal: true

class DocumentsController < ApplicationController
  before_action :set_document, only: %i[edit update destroy]
  load_and_authorize_resource

  # GET /documents or /documents.json
  def index
    @documents = Document.all
    @users = User.where.not(id: current_user.id) if current_user.admin?
  end

  # GET /documents/new
  def new
    @document = Document.new
  end

  # GET /documents/1/edit
  def edit; end

  # POST /documents or /documents.json
  def create # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    conversation_title = (document_params[:title].presence || 'Document Conversation')
    conversation = Conversation.create!(
      title: conversation_title,
      user_id: current_user.id
    )
    @document = Document.new(document_params)
    @document.conversation_id = conversation.id
    respond_to do |format|
      if @document.save
        format.html { redirect_to documents_url, notice: 'Document was successfully created.' }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /documents/1 or /documents/1.json
  def update
    respond_to do |format|
      if @document.update(document_params)
        format.html { redirect_to documents_url, notice: 'Document was successfully updated.' }
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
