# frozen_string_literal: true

class AddSubscriptionToAllUsersWhoDontHaveOne < ActiveRecord::Migration[7.0]
  def change
    User.all.find_each do |user|
      Subscription.create!(plan: 'free', status: 'active', user_id: user.id) unless user.subscription
    end
  end
end
