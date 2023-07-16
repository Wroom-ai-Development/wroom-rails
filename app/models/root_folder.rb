# frozen_string_literal: true

class RootFolder < Folder
  has_many :folders, foreign_key: :parent_id, inverse_of: :parent, dependent: :destroy
end
