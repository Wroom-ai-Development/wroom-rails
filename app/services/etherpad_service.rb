# frozen_string_literal: true

class EtherpadService
  attr_accessor :ether, :group_ids, :pad_ids

  def initialize
    @ether = EtherpadLite.connect(ENV['ETHERPAD_URL'], StringIO.new(ENV['ETHERPAD_API_KEY']).read)
    @group_ids = @ether.client.listAllGroups[:groupIDs]
    @pad_ids = @ether.pads.map(&:id)
  end
end
