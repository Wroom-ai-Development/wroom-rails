class AddSubscriptionToAllUsersWhoDontHaveOne < ActiveRecord::Migration[7.0]
  def change
    User.all.each do |user|
      if !user.subscription
        Subscription.create!(plan: 'free', status: 'active', user_id: user.id)
      end
    end
  end
end
