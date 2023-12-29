# frozen_string_literal: true

desc 'This task is called by the Heroku scheduler add-on'
task renew_free_users_mana: :environment do
  if Time.zone.today.day == 1
    puts "Renewing Free-tier users' mana supply"

    User.all.each do |user|
      next unless user.subscription && user.subscription.plan == 'free'

      user.usage_records.discard_all!
    end
    puts 'done.'
  end
end
