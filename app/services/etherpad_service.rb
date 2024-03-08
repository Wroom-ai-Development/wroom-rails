# frozen_string_literal: true

class EtherpadService
  attr_accessor :ether

  def initialize
    @ether = EtherpadLite.connect(ENV['ETHERPAD_URL'], StringIO.new(ENV['ETHERPAD_API_KEY']).read)
  end
end
