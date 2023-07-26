# frozen_string_literal: true

class WroomController < ApplicationController
  layout 'wroom'

  def app # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    @document = if params[:document_id].present?
                  Document.find(params[:document_id])
                elsif current_user.current_document_id.present?
                  Document.find(current_user.current_document_id)
                elsif current_user.documents.any?
                  current_user.documents.first
                end
    if @document
      current_user.update!(current_document_id: @document.id)
    else
      create_no_documents_messages
    end
  end

  private

  def create_no_documents_messages
    service = OpenaiService.new
    @message = '☚ Have you created any documents yet?'

    @haiku = service.haiku_about_new_venture
  end
end
