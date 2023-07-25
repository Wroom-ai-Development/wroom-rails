# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    password { 'password' }
    confirmed_at { Time.zone.now }
    onboarded { true }
  end
end
