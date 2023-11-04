# frozen_string_literal: true

class AddDiscardedAtToUsageRecords < ActiveRecord::Migration[7.0]
  def change
    add_column :usage_records, :discarded_at, :datetime
    add_index :usage_records, :discarded_at
  end
end
