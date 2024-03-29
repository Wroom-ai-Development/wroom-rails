# frozen_string_literal: true

class DocumentCollaboration < ApplicationRecord
  belongs_to :document
  belongs_to :user
end
