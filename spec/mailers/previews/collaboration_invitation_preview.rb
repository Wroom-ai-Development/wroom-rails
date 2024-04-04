# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/collaboration_invitation
class CollaborationInvitationPreview < ActionMailer::Preview
  def invitation_email
    pending_collaboration = PendingCollaboration.new(email: 'example@example.com', invited_by: 'inviter@example.com',
                                                     document_id: 1)
    CollaborationInvitationMailer.invitation_email(pending_collaboration)
  end
end
