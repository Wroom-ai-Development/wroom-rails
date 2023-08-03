# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :onboard_if_necessary
  before_action :ensure_valid_user, unless: :devise_controller?

  protected

  def onboard_if_necessary
    return unless current_user

    current_user.create_welcome_records unless current_user.onboarded?
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name])
  end

  def ensure_valid_user
    # binding.pry
    return if current_user.security_updated == true

    redirect_to edit_user_registration_path
  end
end
