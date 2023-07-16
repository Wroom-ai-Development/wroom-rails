# frozen_string_literal: true

class WroomProjectsController < ApplicationController
  before_action :set_wroom_project, only: %i[show edit update destroy]
  load_and_authorize_resource

  # GET /wroom_projects or /wroom_projects.json
  def index
    @wroom_projects = WroomProject.all
  end

  # GET /wroom_projects/1 or /wroom_projects/1.json
  def show; end

  # GET /wroom_projects/new
  def new
    @wroom_project = WroomProject.new
    @folder_id = params[:folder_id]
  end

  # GET /wroom_projects/1/edit
  def edit; end

  # POST /wroom_projects or /wroom_projects.json
  def create
    @wroom_project = WroomProject.new(wroom_project_params)

    respond_to do |format|
      if @wroom_project.save
        format.html { redirect_to wroom_project_url(@wroom_project), notice: 'Wroom project was successfully created.' }
        format.json { render :show, status: :created, location: @wroom_project }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @wroom_project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /wroom_projects/1 or /wroom_projects/1.json
  def update
    respond_to do |format|
      if @wroom_project.update(wroom_project_params)
        format.html { redirect_to wroom_project_url(@wroom_project), notice: 'Wroom project was successfully updated.' }
        format.json { render :show, status: :ok, location: @wroom_project }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @wroom_project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /wroom_projects/1 or /wroom_projects/1.json
  def destroy
    @wroom_project.destroy

    respond_to do |format|
      format.html { redirect_to wroom_projects_url, notice: 'Wroom project was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_wroom_project
    @wroom_project = WroomProject.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def wroom_project_params
    params.require(:wroom_project).permit(:name, :user_id, :folder_id)
  end
end
