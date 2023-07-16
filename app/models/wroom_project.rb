# frozen_string_literal: true

class WroomProject < ApplicationRecord
  belongs_to :user

  has_many :sources, dependent: :destroy
  has_many :voices, dependent: :destroy
  has_many :projects, dependent: :destroy

  validate :name, presence: true
end
