# frozen_string_literal: true

class SubscriptionsController < ApplicationController
  layout 'dashboard'
  def subscriptions
    if turbo_frame_request?
      render partial: 'subscriptions/subscriptions'
    end
  end
end
