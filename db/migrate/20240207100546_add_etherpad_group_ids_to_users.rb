# frozen_string_literal: true

class AddEtherpadGroupIdsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :personal_etherpad_group_id, :string
    add_column :users, :shared_etherpad_group_ids, :string, array: true, default: []
  end
end
