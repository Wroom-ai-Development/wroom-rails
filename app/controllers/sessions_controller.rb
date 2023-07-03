# frozen_string_literal: true

class SessionsController < Devise::SessionsController
  def create # rubocop:disable Metrics/AbcSize
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
    resource.monitoring_events.create!(
      user_id: resource.id,
      event_type: 3,
      note: "#{resource.email} signed in to wroom"
    )
    yield resource if block_given?
    respond_with resource, location: after_sign_in_path_for(resource)
  end
end
