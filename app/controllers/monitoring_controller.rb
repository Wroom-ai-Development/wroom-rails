# frozen_string_literal: true

class MonitoringController < ApplicationController
  def index
    @monitoring_events = MonitoringEvent.all.order(:created_at).reverse
    @create_record_events = MonitoringEvent.where(event_type: 0).order(:created_at).reverse
    @message_events = MonitoringEvent.where(event_type: 1).order(:created_at).reverse
  end
end
