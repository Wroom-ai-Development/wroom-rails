# frozen_string_literal: true

json.extract! source, :id, :title, :author, :year_published, :user_id, :created_at, :updated_at
json.url source_url(source, format: :json)
