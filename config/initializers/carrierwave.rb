# frozen_string_literal: true

unless Rails.env.test?
  CarrierWave.configure do |config|
    config.fog_credentials = {
      provider: 'Google',
      google_storage_access_key_id: ENV['GOOGLE_STORAGE_ACCESS_KEY_ID'],
      google_storage_secret_access_key: ENV['GOOGL_STORAGE_API_KEY']
    }
    config.fog_directory = 'wroom-rails'
  end
end
