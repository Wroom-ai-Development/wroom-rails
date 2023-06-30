# frozen_string_literal: true

class Document < ApplicationRecord
  belongs_to :user
  belongs_to :conversation

  validates :title, presence: true
  has_rich_text :content
end
