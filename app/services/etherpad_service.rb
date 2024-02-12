# frozen_string_literal: true

class EtherpadService
  attr_accessor :ether

  def initialize
    @ether = EtherpadLite.connect(9001, File.new('/Users/marcelwojdylo/wroom/etherpad-lite/APIKEY.txt'))
  end
end
