# frozen_string_literal: true

class ProjectsController < ApplicationController
  before_action :set_project,
                only: %i[edit_frame update destroy autosave save_as_source
                         save_as_source_from_frame]
  load_and_authorize_resource

  def edit_frame
    @project = if params[:id].present?
                 Project.find(params[:id])
               else
                 current_user.projects.first
               end
    @conversation = @project.conversation
    @wroom_project_id = @project.wroom_project.id
  end

  def save_as_source_from_frame
    source_name = create_unique_source_name(@project.title)
    source = Source.create!(
      user_id: @project.user_id,
      name: source_name,
      fileless: true,
      title: @project.title
    )
    source.parse_document_chunks_from_text(@project.content.to_plain_text)
    redirect_to wroom_app_path(project_id: @project.id), status: :see_other
  end

  def create_unique_source_name(string)
    if @project.user.sources.where(name: string).any?
      create_unique_source_name("#{string} Copy")
    else
      string
    end
  end

  # GET /projects/new
  def new
    @project = Project.new
    @wroom_project_id = params[:wroom_project_id]
  end

  def autosave
    @project.assign_attributes(project_params)
    @project.save!
    head :ok
  end

  def save_as_source
    source = Source.create!(
      user_id: @project.user_id,
      name: @project.title,
      fileless: true,
      title: @project.title
    )
    source.parse_document_chunks_from_text(@project.content.to_plain_text)
    respond_to do |format|
      format.html { redirect_to source, notice: 'Project was successfully created.' }
    end
  end

  # POST /projects or /projects.json
  def create # rubocop:disable Metrics/MethodLength
    @project = Project.create!(project_params)
    Conversation.create!(
      title: @project.title,
      user_id: @project.user_id,
      project_id: @project.id
    )
    respond_to do |format|
      if @project.save
        format.html { redirect_to wroom_app_path(project_id: @project.id) }
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

    respond_to do |format|
      format.html { redirect_to projects_url, notice: 'Project was successfully destroyed.' }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def project_params
    params.require(:project).permit(:title, :content, :user_id, :wroom_project_id)
  end
end
