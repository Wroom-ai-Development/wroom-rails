# frozen_string_literal: true

module Sources
  class WordParser
    def initialize(file)
      @file = file
      @doc = Docx::Document.open(StringIO.new(file.download, 'rb'))
    end

    def parse_text # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
      paragraphs = @doc.paragraphs.map do |paragraph|
        paragraph_text = ''
        paragraph.each_text_run do |text_run|
          paragraph_text = "#{paragraph_text} #{text_run.text}"
        end
        paragraph_text
      end.join(' ')
      tables = @doc.tables.map do |table|
        table.rows.map do |row|
          row.cells.map(&:text).join(' ')
        end.join(' ')
      end.join(' ')
      (paragraphs + tables).strip.gsub(/\s+/, ' ')
    end
  end
end
