# frozen_string_literal: true

class MonitoringEvent < ApplicationRecord
  belongs_to :trackable, polymorphic: true
end
