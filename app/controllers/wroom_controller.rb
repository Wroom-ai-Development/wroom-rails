# frozen_string_literal: true

class WroomController < ApplicationController
  layout 'wroom'

  def app # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    @document = if params[:document_id].present?
                  Document.find(params[:document_id])
                elsif current_user.current_document_id.present?
                  Document.find(current_user.current_document_id)
                elsif current_user.documents.kept.any?
                  current_user.documents.kept.first
                end
    if @document
      current_user.update!(current_document_id: @document.id)
    else
      redirect_to explorer_folder_path(current_user.root_folder)
    end
  end
end
