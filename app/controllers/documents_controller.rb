# frozen_string_literal: true

class DocumentsController < ApplicationController
  before_action :set_document, only: %i[show edit update destroy]
  load_and_authorize_resource

  # GET /documents or /documents.json
  def index
    @documents = Document.all
    @users = User.all if current_user.admin?
  end

  # GET /documents/1 or /documents/1.json
  def show; end

  # GET /documents/new
  def new
    @document = Document.new
  end

  # GET /documents/1/edit
  def edit; end

  # POST /documents or /documents.json
  def create # rubocop:disable Metrics/MethodLength
    @document = Document.new(document_params)
    save_section_headers
    respond_to do |format|
      if @document.save
        @document.parse_document_chunks_from_file
        format.html { redirect_to document_url(@document), notice: 'Document was successfully created.' }
        format.json { render :show, status: :created, location: @document }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @document.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /documents/1 or /documents/1.json
  def update
    respond_to do |format|
      if @document.update(document_params)
        save_section_headers
        format.html { redirect_to document_url(@document), notice: 'Document was successfully updated.' }
        format.json { render :show, status: :ok, location: @document }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @document.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /documents/1 or /documents/1.json
  def destroy
    @document.destroy

    respond_to do |format|
      format.html { redirect_to documents_url, notice: 'Document was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_document
    @document = Document.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def document_params
    params.require(:document).permit(:name, :title, :author, :year_published, :user_id, :file, :text_category)
  end

  def save_section_headers
    return if params[:document][:section_headers].blank?

    @document.section_headers = []
    params[:document][:section_headers].split(',').map { |header| @document.section_headers << header.strip }
    @document.save!
  end
end
