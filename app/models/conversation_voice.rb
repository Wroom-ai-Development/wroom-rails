# frozen_string_literal: true

class ConversationVoice < ApplicationRecord
  belongs_to :conversation
  belongs_to :voice
end
