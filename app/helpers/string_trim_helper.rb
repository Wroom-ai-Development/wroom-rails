# frozen_string_literal: true

module StringTrimHelper
  def trim_string_to_20_chars(input_string)
    if input_string.length > 20
      "#{input_string[0, 20]}..."
    else
      input_string
    end
  end
end
