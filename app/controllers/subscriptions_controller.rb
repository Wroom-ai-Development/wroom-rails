# frozen_string_literal: true

class SubscriptionsController < ApplicationController
  layout 'dashboard'
  def subscriptions
    @current_subscription = current_user.subscriptions.where('end_date > ?', Date.today).order(created_at: :desc).first
    if turbo_frame_request?
      render partial: 'subscriptions/subscriptions'
    end
  end

  def purchase_success
    current_user.subscriptions.create!(plan: params[:plan], start_date: Date.today, end_date: Date.today + 1.month)
    redirect_to billing_path
  end
end
