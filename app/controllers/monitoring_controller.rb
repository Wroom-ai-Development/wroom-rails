# frozen_string_literal: true

class MonitoringController < ApplicationController
  def index
    @monitoring_events = MonitoringEvent.all
  end
end
