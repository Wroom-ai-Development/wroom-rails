# frozen_string_literal: true

class MonitoringController < ApplicationController
  def index # rubocop:disable Metrics/AbcSize
    authorize! :create, MonitoringEvent
    @monitoring_events = MonitoringEvent.all.order(:created_at).reverse
    @create_record_events = MonitoringEvent.where(event_type: 0).order(:created_at).reverse
    @message_events = MonitoringEvent.where(event_type: 1).order(:created_at).reverse
    @registration_events = MonitoringEvent.where(event_type: [2, 4]).order(:created_at).reverse
    @sign_in_events = MonitoringEvent.where(event_type: 3).order(:created_at).reverse
    @users = User.all.order(:tokens_used).includes(:conversations).reverse
    @total_tokens_used = User.pluck(:tokens_used).sum
  end
end
