# frozen_string_literal: true

# TODO: Drop this model in favor of etherpad_group_id in documents table
class EtherpadGroup < ApplicationRecord
  belongs_to :document
end
