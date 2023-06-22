# frozen_string_literal: true

class Document < ApplicationRecord
  belongs_to :user
  validates :title, presence: true, uniqueness: true
  validates :file, presence: true
  has_one_attached :file
  has_many :context_references, dependent: :destroy
  has_many :conversations, through: :context_references
end
