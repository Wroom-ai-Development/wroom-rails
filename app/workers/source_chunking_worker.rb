# frozen_string_literal: true

class SourceChunkingWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(source_id, raw_text)
    @source = Source.find(source_id)
    @source.source_chunks.destroy_all
    Sources::SemanticChunker.new(@source, raw_text).create_chunks
  end
end
