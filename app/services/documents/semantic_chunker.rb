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
      consolidate_whitespace
    end

    # TODO : Create chunks in resque jobs
    def create_chunks # rubocop:disable Metrics/AbcSize, Metrics/MethodLength, Metrics/PerceivedComplexity, Metrics/CyclomaticComplexity
      headers_regex = /\b(?:#{@document.section_headers.join("|")})\b/i
      sections = []
      if @document.section_headers.any? && @text =~ headers_regex
        lines = @text.split("\n").reject { |ln| ln == '' }
        current_section = { section_header: '', content: '' }
        lines.each_with_index do |line, index|
          if index == lines.length - 1
            current_section[:content] = "#{current_section[:content]}#{line} "
            sections << current_section
          else
            words_in_line = line.split(' ').size
            # TODO : Find a better heuristic for this
            if line =~ headers_regex && words_in_line < HEADER_RECOGNITION_THRESHOLD
              if current_section[:section_header].blank?
                current_section[:section_header] = line
              else
                sections << current_section
                current_section = { section_header: line, content: '' }
              end
            else
              current_section[:content] = "#{current_section[:content]}#{line} "
            end
          end
        end
      else
        sections = [{ section_header: '', content: @text }]
      end
      current_chunk_order = 0
      sections.each do |section|
        current_chunk = DocumentChunk.new(document_id: @document.id, section_header: section[:section_header],
                                          order: current_chunk_order)
        # TODO : Implement Stanford Core NLP to iterate over sentences instead of words
        words = section[:content].split(' ')
        words.each_with_index do |word, index|
          current_content = current_chunk.content || ''
          current_chunk.content = "#{current_content} #{word}"
          chunk_length = current_chunk.content.gsub(/\s+/, '').length / CHARACTERS_PER_TOKEN
          next unless chunk_length > CHUNK_MAX_TOKEN_SIZE || index == words.length - 1

          # TODO : Save text as files to storage instead of db
          current_chunk.save!
          current_chunk_order += 1
          current_chunk = DocumentChunk.new(document_id: @document.id, section_header: section[:section_header],
                                            order: current_chunk_order)
        end
      end
    end

    private

    def consolidate_whitespace
      # Convert multiple whitespaces to a single whitespace
      lines = @text.split("\n").reject { |line| line == '' }
      consolidated = lines.map do |line|
        line.gsub(/\s+/, ' ')
      end.join("\n")
      # Preserve newline characters
      # consolidated.gsub!(/(\S)\n(\S)/, '\1 \2')
      @text = consolidated
    end
  end
end
