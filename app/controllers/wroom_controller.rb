# frozen_string_literal: true

class WroomController < ApplicationController
  layout 'wroom'

  def app
    @document = if params[:document_id].present?
      Document.find(params[:document_id])
    else
      current_user.documents.first
    end
  end
end
