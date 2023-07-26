# frozen_string_literal: true

class AdjustFKs < ActiveRecord::Migration[7.0]
  def change # rubocop:disable Metrics/MethodLength
    remove_foreign_key :documents, :folders
    add_foreign_key :documents, :folders, on_delete: :cascade
    remove_foreign_key :documents, :users
    add_foreign_key :documents, :users, on_delete: :cascade
    remove_foreign_key :folders, :users
    add_foreign_key :folders, :users, on_delete: :cascade
    remove_foreign_key :folders, :folders, column: :parent_id
    add_foreign_key :folders, :folders, column: :parent_id, on_delete: :cascade
    remove_foreign_key :voices, :users
    add_foreign_key :voices, :users, on_delete: :cascade
    remove_foreign_key :sources, :users
    add_foreign_key :sources, :users, on_delete: :cascade
    remove_foreign_key :sources, :folders
    add_foreign_key :sources, :folders, on_delete: :cascade
  end
end
