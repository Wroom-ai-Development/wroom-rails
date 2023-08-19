# frozen_string_literal: true

class DragController < ApplicationController
  def folder
    dragged_folder = Folder.find(permitted_params[:resource_id])
    drop_target_folder = Folder.find(permitted_params[:drop_target_id])
    dragged_folder.update(parent_id: drop_target_folder.id)
  end

  def document
    # binding.pry
    dragged_document = Document.find(permitted_params[:resource_id])
    drop_target_folder = Folder.find(permitted_params[:drop_target_id])
    dragged_document.update(folder_id: drop_target_folder.id)
  end

  def permitted_params
    params.require(:drag).permit(:resource_id, :drop_target_id)
  end
end
