# frozen_string_literal: true

class WroomProject < ApplicationRecord
  belongs_to :user

  has_many :sources, dependent: :destroy
  has_many :voices, dependent: :destroy
  has_many :projects, dependent: :destroy

  validates :name, presence: true
end
