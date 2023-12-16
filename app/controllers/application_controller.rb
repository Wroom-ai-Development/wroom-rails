# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include StringTrimHelper

  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :onboard_if_necessary
  before_action :ensure_valid_user, unless: :devise_controller?
  before_action :set_root_folder, if: :user_signed_in?
  before_action :set_new_source, if: :user_signed_in?

  protected

  def set_new_source
    @new_source = Source.new
  end

  def onboard_if_necessary
    return unless current_user

    current_user.create_welcome_records unless current_user.onboarded?
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[first_name last_name])
  end

  def ensure_valid_user
    # binding.pry
    return if current_user.nil? || current_user.security_updated == true

    redirect_to edit_user_registration_path
  end

  def set_root_folder
    @root_folder = current_user.root_folder
  end
end
