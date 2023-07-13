# frozen_string_literal: true

class MonitoringController < ApplicationController
  def index # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    authorize! :create, MonitoringEvent
    @monitoring_events = MonitoringEvent.all.order(:created_at).reverse
    @create_record_events = MonitoringEvent.where(event_type: 0).order(:created_at).reverse
    @message_events = MonitoringEvent.where(event_type: 1).order(:created_at).reverse
    @registration_events = MonitoringEvent.where(event_type: [2, 4]).order(:created_at).reverse
    @sign_in_events = MonitoringEvent.where(event_type: 3).order(:created_at).reverse
    users = User.all.order(:tokens_used).includes(:conversations).reverse
    @users_data = users.map do |user|
      {
        email: user.email,
        gpt_4_input_tokens: user.usage_records.pluck(:gpt_4_input_tokens).compact.sum,
        gpt_4_output_tokens: user.usage_records.pluck(:gpt_4_output_tokens).compact.sum,
        gpt_3_5_turbo_16k_input_tokens: user.usage_records.pluck(:gpt_3_5_turbo_16k_input_tokens).compact.sum,
        gpt_3_5_turbo_16k_output_tokens: user.usage_records.pluck(:gpt_3_5_turbo_16k_output_tokens).compact.sum,
        gpt_3_5_turbo_input_tokens: user.usage_records.pluck(:gpt_3_5_turbo_input_tokens).compact.sum,
        gpt_3_5_turbo_output_tokens: user.usage_records.pluck(:gpt_3_5_turbo_output_tokens).compact.sum
      }
    end
    @total_tokens_used = User.pluck(:tokens_used).sum
  end
end
