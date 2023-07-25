# frozen_string_literal: true

class RenameProjectsBackToDocuments < ActiveRecord::Migration[7.0]
  def change
    rename_table :projects, :documents
    rename_column :context_references, :project_id, :document_id
    rename_column :conversations, :project_id, :document_id
    rename_column :sources, :project_id, :document_id
    rename_column :users, :current_project_id, :current_document_id
  end
end
