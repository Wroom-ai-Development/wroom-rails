# frozen_string_literal: true

class RechunkSources < ActiveRecord::Migration[7.0]
  def change
    Source.all.find_each(&:rechunk)
  end
end
