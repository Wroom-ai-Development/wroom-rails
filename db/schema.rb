# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_08_03_160219) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_text_rich_texts", force: :cascade do |t|
    t.string "name", null: false
    t.text "body"
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["record_type", "record_id", "name"], name: "index_action_text_rich_texts_uniqueness", unique: true
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "context_references", force: :cascade do |t|
    t.bigint "conversation_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "document_id"
    t.index ["conversation_id"], name: "index_context_references_on_conversation_id"
    t.index ["document_id"], name: "index_context_references_on_document_id"
  end

  create_table "conversation_voices", force: :cascade do |t|
    t.bigint "conversation_id", null: false
    t.bigint "voice_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["conversation_id"], name: "index_conversation_voices_on_conversation_id"
    t.index ["voice_id"], name: "index_conversation_voices_on_voice_id"
  end

  create_table "conversations", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status"
    t.integer "total_requests", default: 0, null: false
    t.integer "last_query_requests", default: 0, null: false
    t.bigint "document_id"
    t.string "status_message"
    t.string "sidekiq_job_id"
  end

  create_table "documents", force: :cascade do |t|
    t.string "title"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "source_based", default: false, null: false
    t.bigint "folder_id"
    t.index ["folder_id"], name: "index_documents_on_folder_id"
    t.index ["user_id"], name: "index_documents_on_user_id"
  end

  create_table "folders", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id", null: false
    t.bigint "parent_id"
    t.string "type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["parent_id"], name: "index_folders_on_parent_id"
    t.index ["user_id"], name: "index_folders_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.integer "role", null: false
    t.text "content", null: false
    t.bigint "conversation_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "partial_answers", array: true
    t.index ["conversation_id"], name: "index_messages_on_conversation_id"
  end

  create_table "monitoring_events", force: :cascade do |t|
    t.string "note"
    t.bigint "trackable_id"
    t.string "trackable_type"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "event_type"
  end

  create_table "source_chunks", force: :cascade do |t|
    t.text "section_header"
    t.text "content", null: false
    t.integer "ordinal_number", default: 0, null: false
    t.bigint "source_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "token_length"
    t.index ["source_id"], name: "index_source_chunks_on_source_id"
  end

  create_table "sources", force: :cascade do |t|
    t.string "title"
    t.string "author"
    t.integer "year_published"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "section_headers", default: [], array: true
    t.text "text_category"
    t.text "name", default: "", null: false
    t.boolean "truncated", default: false, null: false
    t.boolean "fileless", default: false, null: false
    t.string "source_url"
    t.bigint "document_id"
    t.bigint "folder_id"
    t.index ["document_id"], name: "index_sources_on_document_id"
    t.index ["folder_id"], name: "index_sources_on_folder_id"
    t.index ["user_id"], name: "index_sources_on_user_id"
  end

  create_table "usage_records", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "gpt_4_output_tokens", default: 0, null: false
    t.bigint "gpt_4_input_tokens", default: 0, null: false
    t.bigint "gpt_3_5_turbo_input_tokens", default: 0, null: false
    t.bigint "gpt_3_5_turbo_output_tokens", default: 0, null: false
    t.bigint "gpt_3_5_turbo_16k_output_tokens", default: 0, null: false
    t.bigint "gpt_3_5_turbo_16k_input_tokens", default: 0, null: false
    t.bigint "user_id"
    t.bigint "conversation_id"
    t.index ["conversation_id"], name: "index_usage_records_on_conversation_id"
    t.index ["user_id"], name: "index_usage_records_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "role"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "first_name"
    t.string "last_name"
    t.boolean "onboarded"
    t.bigint "current_document_id"
    t.bigint "tokens_used", default: 0
    t.boolean "security_updated", default: false, null: false
    t.boolean "gpt_4_enabled", default: false, null: false
    t.index ["current_document_id"], name: "index_users_on_current_document_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "voices", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "user_id", null: false
    t.text "meta_prompt"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_voices_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "context_references", "conversations"
  add_foreign_key "context_references", "documents", on_delete: :cascade
  add_foreign_key "conversation_voices", "conversations", on_delete: :cascade
  add_foreign_key "conversation_voices", "voices"
  add_foreign_key "documents", "folders", on_delete: :cascade
  add_foreign_key "documents", "users", on_delete: :cascade
  add_foreign_key "folders", "folders", column: "parent_id", on_delete: :cascade
  add_foreign_key "folders", "users", on_delete: :cascade
  add_foreign_key "messages", "conversations"
  add_foreign_key "source_chunks", "sources"
  add_foreign_key "sources", "documents", on_delete: :cascade
  add_foreign_key "sources", "folders", on_delete: :cascade
  add_foreign_key "sources", "users", on_delete: :cascade
  add_foreign_key "voices", "users", on_delete: :cascade
end
