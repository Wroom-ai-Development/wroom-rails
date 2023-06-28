# frozen_string_literal: true

class RegistrationsController < Devise::RegistrationsController
  # The path used after sign up for inactive accounts. You need to overwrite
  # this method in your own RegistrationsController.
  def after_inactive_sign_up_path_for(_resource)
    new_user_session_path
  end
end
