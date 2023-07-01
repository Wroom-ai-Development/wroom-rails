# frozen_string_literal: true

FactoryBot.define do
  factory :voice do
    name { 'MyString' }
    user { nil }
    meta_prompt { 'MyText' }
  end
end
