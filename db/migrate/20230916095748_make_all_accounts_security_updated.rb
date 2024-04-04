# frozen_string_literal: true

class MakeAllAccountsSecurityUpdated < ActiveRecord::Migration[7.0]
  def change
    User.all.find_each do |user|
      user.update(security_updated: true)
    end
  end
end
