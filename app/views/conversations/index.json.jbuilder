# frozen_string_literal: true

json.array! @conversations, partial: 'conversations/conversation', as: :conversation
