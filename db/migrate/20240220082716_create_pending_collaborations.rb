# frozen_string_literal: true

class CreatePendingCollaborations < ActiveRecord::Migration[7.0]
  def change
    create_table :pending_collaborations do |t|
      t.references :document, foreign_key: true
      t.string :email
      t.string :invited_by

      t.timestamps
    end
  end
end
