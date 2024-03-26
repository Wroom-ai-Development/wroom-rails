# frozen_string_literal: true

desc 'Initialize Etherpad integration for all relevant records'
task etherpad_reinit: :environment do
  puts 'Initializing Etherpad authors'
  User.all.each do |user|
    user.update(etherpad_author_id: nil)
  end
  User.all.each(&:initialize_etherpad_author)
  puts 'Initializing Etherpad document groups and pads'

  Document.all.each do |document|
    next if document.source_based

    document.etherpad_group&.destroy!
    document.update!(etherpad_pad_id: nil) if document.etherpad_pad_id
    document.initialize_etherpad
  end
  puts 'Done.'
end
