# frozen_string_literal: true

module SvgHelper
  def show_svg(path)
    File.open("app/assets/images/#{path}", 'rb') do |file|
      raw file.read # rubocop:disable Rails/OutputSafety
    end
  end
end
