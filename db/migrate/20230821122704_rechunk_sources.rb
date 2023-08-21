class RechunkSources < ActiveRecord::Migration[7.0]
  def change
    Source.all.each(&:rechunk)
  end
end
