# frozen_string_literal: true

class CreateEtherpadGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :etherpad_groups do |t|
      t.string :group_id, null: false
      t.belongs_to :document, null: false, index: { unique: true }, foreign_key: true

      t.timestamps
    end
  end
end
