# frozen_string_literal: true

class AddPartialAnswersToMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :partial_answers, :text, array: true
  end
end
