# frozen_string_literal: true

FactoryBot.define do
  factory :source do
    sequence(:title) { |n| "Source #{n}" }
  end
end
