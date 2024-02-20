# frozen_string_literal: true

# app/models/pending_collaboration.rb
class PendingCollaboration < ApplicationRecord
  belongs_to :document
end
