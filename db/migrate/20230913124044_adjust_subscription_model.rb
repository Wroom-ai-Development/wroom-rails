class AdjustSubscriptionModel < ActiveRecord::Migration[7.0]
  def change
    add_column :subscriptions, :stripe_subscription_id, :string
    add_column :subscriptions, :stripe_customer_id, :string
    add_column :subscriptions, :paid_until, :datetime
    add_column :subscriptions, :next_invoice_on, :datetime
    add_column :subscriptions, :status, :string
    remove_column :subscriptions, :start_date, :date
    remove_column :subscriptions, :end_date, :date
  end
end
