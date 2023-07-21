# frozen_string_literal: true

class ProjectsController < ApplicationController
  before_action :set_project,
                only: %i[edit_frame update destroy autosave]
  load_and_authorize_resource

  def edit_frame
    @project = if params[:id].present?
                 Project.find(params[:id])
               else
                 current_user.projects.first
               end
    @conversation = @project.conversation
  end

  def create_unique_source_name(string)
    if @project.user.sources.where(name: string).any?
      create_unique_source_name("#{string} Copy")
    else
      string
    end
  end

  def index
    @projects = Project.all
    @users = User.where.not(id: current_user.id) if current_user.admin?
  end

  # GET /projects/new
  def new
    @project = Project.new
  end

  def autosave
    @project.assign_attributes(project_params)
    @project.save!
    head :ok
  end

  # POST /projects or /projects.json
  def create
    @project = Project.create!(project_params)
    respond_to do |format|
      if @project.save
        format.html { redirect_to root_path(project_id: @project.id) }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /projects/1 or /projects/1.json
  def update
    respond_to do |format|
      if @project.update(project_params)
        format.html { redirect_to edit_project_url(@project), notice: 'Project was successfully updated.' }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1 or /projects/1.json
  def destroy
    @project.destroy
    current_user.update!(current_project_id: nil)

    redirect_to root_path, status: :see_other
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def project_params
    params.require(:project).permit(:title, :content, :user_id)
  end
end
