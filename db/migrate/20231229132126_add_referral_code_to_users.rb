# frozen_string_literal: true

class AddReferralCodeToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :referral_code, :string
    User.all.each(&:set_referral_code)
  end
end
