# frozen_string_literal: true

FactoryBot.define do
  factory :document do
    title { 'MyString' }
    content { 'MyString' }
    user
    conversation
  end
end
