# frozen_string_literal: true

class ContextReference < ApplicationRecord
  belongs_to :conversation
  belongs_to :document
end
