# frozen_string_literal: true

# TODO : Implement better pdf parser
module Documents
  class PdfParser
    def initialize(file)
      @file = file
      @reader = PDF::Reader.new(StringIO.new(file.download, 'rb'))
    end

    def parse_text
      @reader.pages.map(&:text).join(' ')
    end
  end
end
