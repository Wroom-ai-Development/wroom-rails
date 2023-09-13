# frozen_string_literal: true

class Folder < ApplicationRecord
  include Discard::Model
  belongs_to :user
  belongs_to :parent, class_name: 'Folder', optional: true
  has_many :children, class_name: 'Folder', inverse_of: :parent, foreign_key: 'parent_id', dependent: :destroy
  has_many :documents, dependent: :destroy
  after_discard :remove_folder_row
  after_discard :remove_from_sidebar
  after_create :add_to_sidebar
  after_save :remove_folder_row, if: :saved_change_to_parent_id?

  def remove_from_sidebar
    broadcast_remove_to(
      user.id,
      'sidebar_explorer',
      target: "tree-folder-#{id}"
    )
  end

  def add_to_sidebar
    broadcast_append_to(
      user.id,
      'sidebar_explorer',
      partial: 'folders/tree_folder',
      locals: { folder: self },
      target: 'folder-tree'
    )
  end

  def empty?
    children.kept.empty? && documents.kept.empty?
  end

  def remove_folder_row
    broadcast_remove_to user.id, 'folders', target: "folder-row-#{id}"
  end

  def all_documents
    Document.kept.where(folder_id: all_child_folders.pluck(:id)).or(Document.kept.where(folder: self))
  end

  def all_child_folders
    Folder.kept.where(id: children.pluck(:id)).or(Folder.where(id: children.flat_map(&:all_child_folders).pluck(:id)))
  end

  def path
    build_path(self)
  end

  private

  def build_path(folder)
    if folder.parent
      File.join(build_path(folder.parent), folder.name)
    else
      File.join('/', folder.name)
    end
  end
end
