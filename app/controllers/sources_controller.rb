# frozen_string_literal: true

class SourcesController < ApplicationController
  before_action :set_source, only: %i[show edit update destroy]
  load_and_authorize_resource

  layout 'dashboard', only: %i[new edit]

  include ActionView::Helpers::NumberHelper

  def show; end

  # GET /sources/new
  def new
    @source = Source.new
    @folder_id = current_user.current_folder_id || current_user.root_folder.id
  end

  def edit; end

  def create # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
    files = params[:source][:file]
    files.shift
    # TODO: Move creating sources from files to a new SourcesService object
    files.each do |file|
      source = Source.new(user_id: current_user.id, file:, folder_id: current_user.current_folder)
      source.file_size = file.size
      source.source_url = nil
      source.name = source.file.filename.to_s
      source.file_extension = source.file.filename.extension.to_s
      save_section_headers(source)
      if source.save
        source.parse_source_chunks_from_file
        if files.length == 1
          redirect_to wroom_path(document_id: source.document_id), notice: 'Source file uploaded successfully.'
        elsif file == files.last
          redirect_to folder_path(id: current_user.current_folder_id), notice: 'File upload successful.'
        end
      elsif current_user.storage_available <= 0
        redirect_to folder_path(id: current_user.current_folder_id),
                    alert: 'You have exceeded your storage limit. Please upgrade your plan.'
      else
        redirect_to folder_path(id: current_user.current_folder_id), alert: 'Failure uploading source.'
      end
    end
  end

  def update # rubocop:disable Metrics/MethodLength, Metrics/AbcSize, Metrics/PerceivedComplexity, Metrics/CyclomaticComplexity
    respond_to do |format|
      if @source.update(source_params)
        # TODO: Move updating a source to a new SourcesService object
        old_headers = @source.section_headers
        @source.file_size = source_params[:file].size if source_params[:file].present?
        if params[:source][:section_headers].blank?
          @source.update(section_headers: [])
        else
          save_section_headers(@source)
        end
        if params[:source][:file].present?
          @source.clear_chunks
          @source.parse_source_chunks_from_file
          @source.update!(file_size: source_params[:file].size, fileless: false)
        elsif params[:source][:source_url].present?
          @source.clear_chunks
          @source.parse_source_chunks_from_source_url
        end
        @source.document.update!(title: @source.name) if params[:source][:name].present?
        @source.rechunk if @source.section_headers != old_headers
        current_user.update!(current_document_id: @source.document_id)
        format.html { redirect_to wroom_path(document_id: @source.document) }
      else
        format.html { render :edit, status: :unprocessable_entity, layout: 'dashboard' }
      end
    end
  end

  def destroy
    @source.destroy

    respond_to do |format|
      format.html { redirect_to sources_url, notice: 'Source was successfully destroyed.' }
    end
  end

  private

  def set_source
    @source = Source.find(params[:id])
  end

  def source_params
    params.require(:source).permit(:name, :title, :author, :year_published, :user_id, :file, :text_category,
                                   :source_url, :section_headers, :folder_id)
  end

  # TODO: Move this logic into SourcesService too
  def save_section_headers(source)
    return if params[:source][:section_headers].blank?

    source.section_headers = []
    params[:source][:section_headers].split(',').map { |header| source.section_headers << header.strip.singularize }
    source.save!
  end
end
