# frozen_string_literal: true

class CollaborationInvitationMailer < ApplicationMailer
  def invitation_email(pending_collaboration)
    @pending_collaboration = pending_collaboration
    mail(to: @pending_collaboration.email, subject: 'Invitation to Wroom App')
  end
end
