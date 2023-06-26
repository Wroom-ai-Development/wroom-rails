# frozen_string_literal: true

class DocumentChunkingWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(document_id, raw_text)
    Documents::SemanticChunker.new(Document.find(document_id), raw_text).create_chunks
  end
end
