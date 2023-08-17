# frozen_string_literal: true

class Folder < ApplicationRecord
  include Discard::Model
  belongs_to :user
  belongs_to :parent, class_name: 'Folder', optional: true
  has_many :children, class_name: 'Folder', inverse_of: :parent, foreign_key: 'parent_id', dependent: :destroy
  has_many :documents, dependent: :destroy
  after_discard :announce_destroy

  def empty?
    children.empty? && documents.empty?
  end

  def announce_destroy
    broadcast_remove_to user.id, 'folders', target: "folder-row-#{id}"
  end
end
