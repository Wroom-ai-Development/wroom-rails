class AdjustUsersTable < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :stripe_customer_id, :string
    remove_column :subscriptions, :user_id, :bigint
    add_reference :subscriptions, :user, foreign_key: false
    add_reference :users, :subscription, foreign_key: true
    User.all.each do |user|
      user.create_subscription!(plan: 'free', status: 'active')
    end
  end
end
