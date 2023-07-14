# frozen_string_literal: true

class SourcesController < ApplicationController
  before_action :set_source, only: %i[show edit update destroy]
  load_and_authorize_resource

  # GET /sources or /sources.json
  def index
    @sources = Source.all
    @users = User.where.not(id: current_user.id) if current_user.admin?
  end

  # GET /sources/1 or /sources/1.json
  def show; end

  # GET /sources/new
  def new
    @source = Source.new
  end

  # GET /sources/1/edit
  def edit; end

  # POST /sources or /sources.json
  def create # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
    @source = Source.new(source_params)
    save_section_headers
    respond_to do |format|
      if @source.save
        if @source.file.attached?
          @source.parse_document_chunks_from_file
        elsif @source.source_url.present?
          @source.parse_document_chunks_from_source_url
        end
        format.html { redirect_to source_url(@source), notice: 'Source was successfully created.' }
        format.json { render :show, status: :created, location: @source }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @source.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sources/1 or /sources/1.json
  def update # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
    respond_to do |format|
      if @source.update(source_params)
        old_headers = @source.section_headers
        if params[:source][:section_headers].blank?
          @source.update(section_headers: [])
        else
          save_section_headers
        end
        if params[:source][:file].present?
          @source.clear_chunks
          @source.parse_document_chunks_from_file
          @source.update!(fileless: false)
        end

        @source.rechunk if @source.section_headers != old_headers
        format.html { redirect_to source_url(@source), notice: 'Source was successfully updated.' }
        format.json { render :show, status: :ok, location: @source }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @source.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sources/1 or /sources/1.json
  def destroy
    @source.destroy

    respond_to do |format|
      format.html { redirect_to sources_url, notice: 'Source was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def delete_from_frame
    @source.destroy

    head :ok
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_source
    @source = Source.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def source_params
    params.require(:source).permit(:name, :title, :author, :year_published, :user_id, :file, :text_category,
                                   :source_url)
  end

  def save_section_headers
    return if params[:source][:section_headers].blank?

    @source.section_headers = []
    params[:source][:section_headers].split(',').map { |header| @source.section_headers << header.strip.singularize }
    @source.save!
  end
end
