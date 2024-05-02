# frozen_string_literal: true

class FoldersController < ApplicationController
  before_action :set_folder, only: %i[show edit update destroy undiscard]
  load_and_authorize_resource
  layout 'dashboard'

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

  def show # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    current_user.update!(current_folder_id: @folder.id)
    # TODO: Put query logic in a service object
    @in_query = params[:query].present?
    if @in_query
      @folders = @folder.all_child_folders.where('lower(name) LIKE ?', "%#{params[:query].downcase}%")
      @documents = @folder.all_documents.where('lower(title) LIKE ?', "%#{params[:query].downcase}%")
    else
      @folders = @folder.children.kept
      @documents = @folder.documents.kept
    end
    # TODO: Move breadcrumb logic to a private method in this controller
    clear_breadcrumbs
    @folder.parents.reverse.each do |parent|
      add_breadcrumb(parent.name, folder_path(parent))
    end
    add_breadcrumb(@folder.name, folder_path(@folder))

    return unless @folder.type == 'RootFolder' && @folder.empty?

    @haiku = OpenaiService.new.haiku_about_new_venture
  end

  def new
    @folder = Folder.new
    @parent_id = current_user.current_folder_id || current_user.root_folder.id
  end

  def edit; end

  def create
    @folder = Folder.new(folder_params)
    @folder.type = 'Folder'
    if @folder.save
      current_user.update!(current_folder_id: @folder.id)
      redirect_to folder_path(@folder.parent), notice: 'Folder was successfully created.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @folder.update(folder_params)
      redirect_to @folder
    else
      render :edit, status: :unprocessable_entity
    end
  end

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

  def set_folder
    @folder = Folder.find(params[:id])
  end

  def folder_params
    params.require(:folder).permit(:name, :user_id, :parent_id)
  end
end
