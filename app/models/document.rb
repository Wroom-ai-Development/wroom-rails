# frozen_string_literal: true

class Document < ApplicationRecord
  belongs_to :user
  validates :title, presence: true, uniqueness: true
end
