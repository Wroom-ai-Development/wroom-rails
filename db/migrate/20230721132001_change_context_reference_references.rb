# frozen_string_literal: true

class ChangeContextReferenceReferences < ActiveRecord::Migration[7.0]
  def change
    remove_reference :context_references, :source, index: true, foreign_key: true
    add_reference :context_references, :project, index: true, foreign_key: true
  end
end
