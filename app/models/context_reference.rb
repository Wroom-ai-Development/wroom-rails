# frozen_string_literal: true

class ContextReference < ApplicationRecord
  belongs_to :conversation
  belongs_to :project

  delegate :source, to: :project
end
