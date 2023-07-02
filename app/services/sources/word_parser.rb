# frozen_string_literal: true

# TODO : Implement better pdf parser
module Sources
  class WordParser
    def initialize(file)
      @file = file
      @doc = Docx::Document.open(StringIO.new(file.download, 'rb'))
    end

    def parse_text
      @doc.paragraphs.map do |paragraph|
        paragraph.each_text_run do |text|
          text
        end.join(' ')
      end.join(' ')
    end
  end
end
