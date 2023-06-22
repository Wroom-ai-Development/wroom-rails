# frozen_string_literal: true

FactoryBot.define do
  factory :message do
    role { 'user' }
    content { 'This is a message content!' }
  end
end
