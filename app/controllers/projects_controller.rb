# frozen_string_literal: true

class ProjectsController < ApplicationController # rubocop:disable Metrics/ClassLength
  before_action :set_project,
                only: %i[edit_frame update destroy autosave save_as_source destroy_from_frame
                         save_as_source_from_frame]
  load_and_authorize_resource

  # GET /projects or /projects.json

  def projects_frame
    @projects = current_user.projects.order(:created_at).reverse
  end

  def new_frame
    @project = Project.new
  end

  def create_from_frame
    conversation_title = (project_params[:title].presence || 'Project Conversation')
    conversation = Conversation.create!(
      title: conversation_title,
      user_id: project_params[:user_id]
    )
    @project = Project.new(project_params)
    @project.conversation_id = conversation.id
    @project.save
    redirect_to root_path(project_id: @project.id), status: :see_other
  end

  def destroy_from_frame
    current_user.update!(current_project_id: nil) if @project.id == current_user.current_project_id
    @project.destroy
    redirect_to root_path, status: :see_other
  end

  def edit_frame
    @project = if params[:id].present?
                 Project.find(params[:id])
               else
                 current_user.projects.first
               end
    @conversation = @project.conversation
  end

  def save_as_source_from_frame
    source_name = create_unique_source_name(@project.title)
    source = Source.create!(
      user_id: @project.user_id,
      name: source_name,
      fileless: true,
      title: @project.title
    )
    source.parse_project_chunks_from_text(@project.content.to_plain_text)
    redirect_to root_path(project_id: @project.id), status: :see_other
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

  def save_as_source
    source = Source.create!(
      user_id: @project.user_id,
      name: @project.title,
      fileless: true,
      title: @project.title
    )
    source.parse_project_chunks_from_text(@project.content.to_plain_text)
    respond_to do |format|
      format.html { redirect_to source, notice: 'Project was successfully created.' }
    end
  end

  # POST /projects or /projects.json
  def create # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    conversation_title = (project_params[:title].presence || 'Project Conversation')
    conversation = Conversation.create!(
      title: conversation_title,
      user_id: project_params[:user_id]
    )
    @project = Project.new(project_params)
    @project.conversation_id = conversation.id
    respond_to do |format|
      if @project.save
        format.html { redirect_to projects_path }
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
    params.require(:project).permit(:title, :content, :user_id)
  end
end
