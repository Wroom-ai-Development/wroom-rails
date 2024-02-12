# frozen_string_literal: true

desc 'Initialize Etherpad integration for all relevant records'
task etherpad_init: :environment do
  puts 'Initializing Etherpad authors'
  User.all.each(&:initialize_etherpad_author)
  puts 'Initializing Etherpad document groups and pads'
  Document.all.each do |document|
    next if document.source_based

    document.initialize_etherpad
  end
  puts 'Done.'
end
