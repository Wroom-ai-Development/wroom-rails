# frozen_string_literal: true

class RegistrationsController < Devise::RegistrationsController
  # The path used after sign up for inactive accounts. You need to overwrite
  # this method in your own RegistrationsController.
  layout 'dashboard', only: %i[edit]

  def after_inactive_sign_up_path_for(_resource)
    new_user_session_path
  end

  def create # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    build_resource(sign_up_params.merge!(security_updated: true))

    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        respond_with resource, location: after_sign_up_path_for(resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

  def update # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

    resource_updated = update_resource(resource, account_update_params)
    yield resource if block_given?
    if resource_updated
      resource.update!(security_updated: true)
      set_flash_message_for_update(resource, prev_unconfirmed_email)
      bypass_sign_in resource, scope: resource_name if sign_in_after_change_password?

      respond_with resource, location: after_update_path_for(resource)
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end
end
