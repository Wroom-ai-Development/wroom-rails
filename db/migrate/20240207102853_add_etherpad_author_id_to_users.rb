# frozen_string_literal: true

class AddEtherpadAuthorIdToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :etherpad_author_id, :string
  end
end
