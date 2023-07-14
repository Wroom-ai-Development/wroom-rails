# frozen_string_literal: true

# TODO : Implement better pdf parser
module Sources
  class UrlParser
    def initialize(source_url)
      @source_url = source_url
    end

    def parse_text
      html = HTTParty.get(@source_url).body
      doc = Nokogiri::HTML(html)
      doc.css('script, style').remove  # Remove script and style tags

      doc.xpath('//text()').to_s.strip
    end
  end
end
