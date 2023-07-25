class AddCascadeDeletes < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :context_references, :documents
    add_foreign_key :context_references, :documents, on_delete: :cascade
    remove_foreign_key :sources, :documents
    add_foreign_key :sources, :documents, on_delete: :cascade
    remove_foreign_key :conversation_voices, :conversations
    add_foreign_key :conversation_voices, :conversations, on_delete: :cascade
  end
end
