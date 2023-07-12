# frozen_string_literal: true

class ChangeDocumentsToProjects < ActiveRecord::Migration[7.0]
  def change
    rename_table :documents, :projects
    rename_column :users, :current_document_id, :current_project_id
    MonitoringEvent.where(trackable_type: 'Document').update_all( # rubocop:disable Rails/SkipsModelValidations
      trackable_type: 'Project'
    )
  end
end
