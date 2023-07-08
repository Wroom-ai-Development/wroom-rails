# frozen_string_literal: true

class ConfirmationsController < Devise::ConfirmationsController
  private

  def after_confirmation_path_for(_resource_name, resource)
    resource.monitoring_events.create!(event_type: 4, user_id: resource.id, note: "#{resource.email} confirmed their account")
    sign_in(resource)
    root_path
  end
end
