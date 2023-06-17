# frozen_string_literal: true

json.extract! document, :id, :title, :notes, :author, :year_published, :user_id, :created_at, :updated_at
json.url document_url(document, format: :json)
