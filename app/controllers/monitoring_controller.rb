# frozen_string_literal: true

class MonitoringController < ApplicationController
  def index
    @monitoring_events = MonitoringEvent.all.order(:created_at).reverse
    @create_record_events = MonitoringEvent.where(event_type: 0).order(:created_at).reverse
    @message_events = MonitoringEvent.where(event_type: 1).order(:created_at).reverse
    @registration_events = MonitoringEvent.where(event_type: [2, 4]).order(:created_at).reverse
    @sign_in_events = MonitoringEvent.where(event_type: 3).order(:created_at).reverse
  end
end