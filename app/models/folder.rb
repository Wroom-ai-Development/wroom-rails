# frozen_string_literal: true

class Folder < ApplicationRecord
  include Discard::Model
  belongs_to :user
  belongs_to :parent, class_name: 'Folder', optional: true
  has_many :children, class_name: 'Folder', inverse_of: :parent, foreign_key: 'parent_id', dependent: :destroy
  has_many :documents, dependent: :destroy
  after_discard :remove_folder_row
  after_discard :remove_from_sidebar
  after_save :remove_folder_row, if: :saved_change_to_parent_id?

  def remove_from_sidebar
    broadcast_remove_to(
      user.id,
      'sidebar_explorer',
      target: "tree-folder-#{id}"
    )
  end

  def empty?
    children.empty? && documents.empty?
  end

  def remove_folder_row
    broadcast_remove_to user.id, 'folders', target: "folder-row-#{id}"
  end
end
