# frozen_string_literal: true

json.extract! conversation, :id, :title, :user_id, :created_at, :updated_at
json.url conversation_url(conversation, format: :json)
