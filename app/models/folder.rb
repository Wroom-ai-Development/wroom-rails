# frozen_string_literal: true

class Folder < ApplicationRecord
  belongs_to :user
  belongs_to :parent, class_name: 'Folder', optional: true
  has_many :children, class_name: 'Folder', inverse_of: :parent, foreign_key: 'parent_id', dependent: :destroy
end
