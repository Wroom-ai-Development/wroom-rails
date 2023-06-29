# frozen_string_literal: true

class CreateVoices < ActiveRecord::Migration[7.0]
  def change # rubocop:disable Metrics/MethodLength
    create_table :voices do |t|
      t.string :name, null: false
      t.references :user, null: false, foreign_key: true
      t.text :meta_prompt

      t.timestamps
    end

    create_table :conversation_voices do |t|
      t.references :conversation, null: false, foreign_key: true
      t.references :voice, foreign_key: true

      t.timestamps
    end
  end
end
