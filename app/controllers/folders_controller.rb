# frozen_string_literal: true

class FoldersController < ApplicationController
  before_action :set_folder, only: %i[show edit update destroy undiscard]
  load_and_authorize_resource

  # GET /folders/1 or /folders/1.json

  def explorer
    @root_folder = current_user.root_folder
    @current_folder = params[:id].present? ? Folder.find(params[:id]) : @root_folder
  end

  def recycle_bin
    @folders = current_user.folders.discarded
    @documents = current_user.documents.discarded
    @voices = current_user.voices.discarded
  end

  def show
    return unless @folder.type == 'RootFolder' && @folder.empty?

    @haiku = OpenaiService.new.haiku_about_new_venture
  end

  # GET /folders/new
  def new
    @folder = Folder.new
    @parent_id = (params[:parent_id].presence || current_user.root_folder.id)
  end

  # GET /folders/1/edit
  def edit; end

  # POST /folders or /folders.json
  def create
    @folder = Folder.new(folder_params)
    @folder.type = 'Folder'
    respond_to do |format|
      if @folder.save
        format.html { redirect_to explorer_folder_url(@folder) }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /folders/1 or /folders/1.json
  def update
    respond_to do |format|
      if @folder.update(folder_params)
        format.html { redirect_to explorer_folder_url(@folder) }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /folders/1 or /folders/1.json
  def destroy
    @folder.parent_id

    @folder.discard

    respond_to do |format|
      format.html { redirect_to explorer_folder_path(@folder.parent) }
    end
  end

  def undiscard
    @folder.undiscard
    respond_to do |format|
      format.html { redirect_to explorer_folder_path(@folder) }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_folder
    @folder = Folder.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def folder_params
    params.require(:folder).permit(:name, :user_id, :parent_id)
  end
end
