# frozen_string_literal: true

# app/models/pending_collaboration.rb
class PendingCollaboration < ApplicationRecord
  belongs_to :document
  after_create :send_invitation_email

  def send_invitation_email
    CollaborationInvitationMailer.invitation_email(self).deliver_now
  end
end
