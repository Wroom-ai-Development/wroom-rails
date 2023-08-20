# frozen_string_literal: true

# TODO : Implement better pdf parser
module Sources
  class WordParser
    def initialize(file)
      @file = file
      @doc = Docx::Document.open(StringIO.new(file.download, 'rb'))
    end

    def parse_text # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
      paragraphs = @doc.paragraphs.map do |paragraph|
        paragraph.each_text_run.map do |text|
          text
        end.join(' ')
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
