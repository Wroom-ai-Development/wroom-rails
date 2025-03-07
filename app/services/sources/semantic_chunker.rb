# frozen_string_literal: true

module Sources
  class SemanticChunker # rubocop:disable Metrics/ClassLength
    CHUNK_MAX_TOKEN_SIZE = 5_000
    # TODO : Implement actual token counts
    CHARACTERS_PER_TOKEN = 2.7
    HEADER_RECOGNITION_THRESHOLD = 5
    MAX_CHUNKS = 25

    def initialize(source, text)
      @source = source
      @text = text
      @lines = @text.split("\n").reject(&:blank?)
      prepare_text
      @sections = []
      @processing_last_section = false
      @current_chunk_ordinal_number = 0
    end

    # TODO : Create chunks in resque jobs
    def create_chunks
      divide_text_into_sections
      save_chunks_from_sections
    end

    private

    def divide_text_into_sections
      if source_seems_to_have_sections?
        process_sections
      else
        @sections = [{ section_header: '', content: @text }]
      end
    end

    def process_sections
      @current_section = { section_header: '', content: '' }
      @lines.each_with_index do |line, index|
        prcess_line_at_index(line, index)
      end
    end

    def prcess_line_at_index(line, index)
      if index == @lines.length - 1
        add_to_current_section(line)
        close_current_section
      elsif seems_to_be_a_section_header?(line)
        handle_section_header(line)
      else
        @current_section[:content] = "#{@current_section[:content]}#{line} "
      end
    end

    def handle_section_header(line)
      if @current_section[:section_header].blank?
        @current_section[:section_header] = line
      else
        @sections << @current_section
        @current_section = { section_header: line, content: '' }
      end
    end

    # TODO : Find a better heuristic for this
    def seems_to_be_a_section_header?(line)
      words_in_line = line.split(' ').size
      line =~ headers_regex && words_in_line < HEADER_RECOGNITION_THRESHOLD
    end

    def add_to_current_section(line)
      @current_section[:content] = "#{@current_section[:content]}#{line} "
    end

    def close_current_section
      @sections << @current_section
    end

    def source_seems_to_have_sections?
      @source.section_headers.any? && @text =~ headers_regex
    end

    def headers_regex
      @headers_regex ||= /\b(?:#{@source.section_headers.join('|')})\b/i
    end

    def save_chunks_from_sections
      @current_chunk_ordinal_number = 0
      @sections.each_with_index do |section, index|
        @processing_last_section = true if index == @sections.length - 1
        save_chunks(section)
      end
    end

    def save_chunks(section) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
      return if @source.truncated?

      @current_section_header = section[:section_header]
      chunks = section[:content].chars.each_slice(CHUNK_MAX_TOKEN_SIZE * CHARACTERS_PER_TOKEN).map(&:join)
      chunks.each_with_index do |chunk, _index|
        break if @source.source_chunks.count >= MAX_CHUNKS

        chunk_token_length = Tiktoken.encoding_for_model('gpt-4').encode(chunk).length
        chunk_without_null_bytes = chunk.gsub("\u0000", '')
        SourceChunk.create!(
          source_id: @source.id,
          section_header: section[:section_header].strip,
          ordinal_number: @current_chunk_ordinal_number,
          content: chunk_without_null_bytes,
          token_length: chunk_token_length
        )
        @current_chunk_ordinal_number += 1
      end
      @source.update(truncated: true) if @source.source_chunks.count >= MAX_CHUNKS
    end

    def prepare_text
      remove_null_bytes
      consolidate_whitespace
    end

    def remove_null_bytes
      @text = @text.gsub("\u0000", '')
    end

    def consolidate_whitespace
      # Convert multiple whitespaces to a single whitespace
      consolidated = @lines.map do |line|
        line.gsub(/\s+/, ' ')
      end.join("\n")
      # Preserve newline characters
      # consolidated.gsub!(/(\S)\n(\S)/, '\1 \2')
      @text = consolidated
    end
  end
end
