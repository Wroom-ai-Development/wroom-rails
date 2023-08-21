# frozen_string_literal: true

class FoldersController < ApplicationController
  before_action :set_folder, only: %i[show edit update destroy undiscard]
  load_and_authorize_resource
  layout 'dashboard'
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

  def empty_recycle_bin
    @folders = current_user.folders.discarded
    @documents = current_user.documents.discarded
    @voices = current_user.voices.discarded
    @documents.destroy_all
    @folders.destroy_all
    @voices.destroy_all
    redirect_to dashboard_path
  end

  def show
    current_user.update!(current_folder_id: @folder.id)
    return unless @folder.type == 'RootFolder' && @folder.empty?

    @haiku = OpenaiService.new.haiku_about_new_venture
  end

  # GET /folders/new
  def new
    @folder = Folder.new
    @parent_id = current_user.current_folder_id || current_user.root_folder.id
  end

  # GET /folders/1/edit
  def edit; end

  # POST /folders or /folders.json
  def create
    # binding.pry
    @folder = Folder.new(folder_params)
    @folder.type = 'Folder'
    if @folder.save
      current_user.update!(current_folder_id: @folder.id)
      redirect_to folder_path(@folder.parent)
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /folders/1 or /folders/1.json
  def update
    if @folder.update(folder_params)
      redirect_to @folder
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /folders/1 or /folders/1.json
  def destroy
    @folder.discard
    @folder = @folder.parent
    head :no_content
  end

  def undiscard
    @folder.undiscard
    redirect_to @folder
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
