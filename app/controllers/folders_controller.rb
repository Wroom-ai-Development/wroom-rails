# frozen_string_literal: true

class FoldersController < ApplicationController
  before_action :set_folder, only: %i[show edit update destroy]
  load_and_authorize_resource

  # GET /folders/1 or /folders/1.json

  def root_folder
    @folder = current_user.root_folder
    render :show
  end

  def show; end

  # GET /folders/new
  def new
    @folder = Folder.new
    @parent_id = (params[:parent_id].presence || current_user.root_folder.id)
  end

  # GET /folders/1/edit
  def edit; end

  # POST /folders or /folders.json
  def create # rubocop:disable Metrics/MethodLength
    @folder = Folder.new(folder_params)
    @folder.type = 'Folder'
    respond_to do |format|
      if @folder.save
        format.html { redirect_to folder_url(@folder), notice: 'Folder was successfully created.' }
        format.json { render :show, status: :created, location: @folder }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @folder.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /folders/1 or /folders/1.json
  def update
    respond_to do |format|
      if @folder.update(folder_params)
        format.html { redirect_to folder_url(@folder), notice: 'Folder was successfully updated.' }
        format.json { render :show, status: :ok, location: @folder }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @folder.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /folders/1 or /folders/1.json
  def destroy
    parent_id = @folder.parent_id
    @folder.destroy
    respond_to do |format|
      format.html { redirect_to folder_url(Folder.find(parent_id)) }
      format.json { head :no_content }
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
