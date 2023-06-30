# frozen_string_literal: true

FactoryBot.define do
  factory :document do
    title { 'MyString' }
    content { 'MyString' }
    user { nil }
    conversation { nil }
  end
end
