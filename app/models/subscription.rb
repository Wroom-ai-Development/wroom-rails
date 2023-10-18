# frozen_string_literal: true

class Subscription < ApplicationRecord
  belongs_to :user

  validates :plan, inclusion: { in: %w[pro basic free] }
end
