# frozen_string_literal: true

class CreateSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :subscriptions do |t|
      t.references :user, null: false, foreign_key: true
      t.string :plan, null: false
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.timestamps
    end
  end
end
