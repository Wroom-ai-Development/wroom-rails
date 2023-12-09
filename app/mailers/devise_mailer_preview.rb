# frozen_string_literal: true

class DeviseMailerPreview < MailView
  def confirmation_instructions
    user = User.first
    Devise::Mailer.confirmation_instructions(user, {})
  end

  def reset_password_instructions
    user = User.first
    Devise::Mailer.reset_password_instructions(user, {})
  end

  # Add more preview methods for other Devise mailers as needed
end
