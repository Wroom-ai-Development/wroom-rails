# frozen_string_literal: true

class SourceChunkingWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(source_id, raw_text)
    Sources::SemanticChunker.new(Source.find(source_id), raw_text).create_chunks
  end
end
