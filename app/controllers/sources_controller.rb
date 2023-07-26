# frozen_string_literal: true

class SourcesController < ApplicationController
  before_action :set_source, only: %i[show edit update destroy]
  load_and_authorize_resource

  # GET /sources/1 or /sources/1.json
  def show; end

  # GET /sources/new
  def new
    @source = Source.new
    @folder_id = params[:folder_id] || current_user.root_folder.id
  end

  # GET /sources/1/edit
  def edit; end

  # POST /sources or /sources.json
  def create # rubocop:disable Metrics/MethodLength
    @source = Source.new(source_params)

    save_section_headers
    if @source.save
      if @source.file.attached?
        @source.parse_source_chunks_from_file
      elsif @source.source_url.present?
        @source.parse_source_chunks_from_source_url
      end
      redirect_to wroom_path(document_id: @source.document_id)
    else
      respond_to do |format|
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sources/1 or /sources/1.json
  def update # rubocop:disable Metrics/MethodLength, Metrics/AbcSize, Metrics/PerceivedComplexity
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
          @source.parse_source_chunks_from_file
          @source.update!(fileless: false)
        elsif params[:source][:source_url].present?
          @source.clear_chunks
          @source.parse_source_chunks_from_source_url
        end

        @source.rechunk if @source.section_headers != old_headers
        format.html { redirect_to wroom_path(@source.document) }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sources/1 or /sources/1.json
  def destroy
    @source.destroy

    respond_to do |format|
      format.html { redirect_to sources_url, notice: 'Source was successfully destroyed.' }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_source
    @source = Source.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def source_params
    params.require(:source).permit(:name, :title, :author, :year_published, :user_id, :file, :text_category,
                                   :source_url, :section_headers, :folder_id)
  end

  def save_section_headers
    return if params[:source][:section_headers].blank?

    @source.section_headers = []
    params[:source][:section_headers].split(',').map { |header| @source.section_headers << header.strip.singularize }
    @source.save!
  end
end
