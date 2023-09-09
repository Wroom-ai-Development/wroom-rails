# frozen_string_literal: true

class Subscription < ApplicationRecord # rubocop:disable Metrics/ClassLength
  belongs_to :user

  validate :start_date_before_end_date
  validates :plan, inclusion: { in: %w[pro basic] }

  private

  def start_date_before_end_date
    return if start_date < end_date

    errors.add(:start_date, 'must be before end date')
  end
end
