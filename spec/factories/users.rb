# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    password { '1234!@#$qwerQWER' }
    confirmed_at { Time.zone.now }
    onboarded { true }
    security_updated { true }
  end
end
