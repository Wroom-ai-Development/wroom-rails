# frozen_string_literal: true

class DocumentsController < ApplicationController
  before_action :set_document,
                only: %i[editor destroy autosave]
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
    @documents = Document.all
    @users = User.where.not(id: current_user.id) if current_user.admin?
  end

  # GET /documents/new
  def new
    @document = Document.new
    @folder_id = params[:folder_id] || current_user.root_folder.id
  end

  def autosave
    @document.assign_attributes(document_params)
    @document.save!
    head :ok
  end

  # POST /documents or /documents.json
  def create
    @document = Document.create!(document_params)
    respond_to do |format|
      if @document.save
        format.html { redirect_to wroom_path(document_id: @document.id) }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /documents/1 or /documents/1.json
  def destroy
    @document.source.destroy! if @document.source.present?
    @document.destroy
    current_user.update!(current_document_id: nil)

    redirect_to wroom_path, status: :see_other
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
