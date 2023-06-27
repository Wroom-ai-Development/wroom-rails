# frozen_string_literal: true

class AddSearchableColumnToChunks < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      ALTER TABLE document_chunks
      ADD COLUMN searchable tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(content,'')), 'A') ||
        setweight(to_tsvector('english', coalesce(section_header, '')), 'B')
      ) STORED;
    SQL
  end

  def down
    remove_column :document_chunks, :searchable
  end
end
