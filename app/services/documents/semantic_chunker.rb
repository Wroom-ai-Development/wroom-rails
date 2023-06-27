# frozen_string_literal: true

module Documents
  class SemanticChunker
    # TODO : Dynamically set this value depending on tokens in messages
    CHUNK_MAX_TOKEN_SIZE = 14_000
    # TODO : Implement actual token counts
    CHARACTERS_PER_TOKEN = 4
    HEADER_RECOGNITION_THRESHOLD = 5

    def initialize(document, text)
      @document = document
      @text = text
      @sections = []
      @lines = @text.split("\n").reject(&:blank?)
      @processing_last_section = false
      @current_chunk_ordinal_number = 0
      consolidate_whitespace
    end

    # TODO : Create chunks in resque jobs
    def create_chunks
      benchmark = Benchmark.measure do
        divide_text_into_sections
        save_chunks_from_sections
      end
      fputs benchmark
    end

    private

    def divide_text_into_sections
      if document_seems_to_have_sections?
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

    def document_seems_to_have_sections?
      @document.section_headers.any? && @text =~ headers_regex
    end

    def headers_regex
      @headers_regex ||= /\b(?:#{@document.section_headers.join("|")})\b/i
    end

    def save_chunks_from_sections
      @current_chunk_ordinal_number = 0
      @sections.each_with_index do |section, index|
        @processing_last_section = true if index == @sections.length - 1
        save_chunks(section)
      end
    end

    def save_chunks(section) # rubocop:disable Metrics/MethodLength
      @current_section_header = section[:section_header]
      chunks = section[:content].chars.each_slice(CHUNK_MAX_TOKEN_SIZE * CHARACTERS_PER_TOKEN).map(&:join)
      chunks.each_with_index do |chunk, _index|
        DocumentChunk.create!(
          document_id: @document.id,
          section_header: section[:section_header].strip,
          ordinal_number: @current_chunk_ordinal_number,
          content: chunk
        )
        @current_chunk_ordinal_number += 1
      end
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
