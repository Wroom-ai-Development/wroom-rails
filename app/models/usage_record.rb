# frozen_string_literal: true

class UsageRecord < ApplicationRecord
  belongs_to :user
  belongs_to :conversation
end
