# frozen_string_literal: true

if Rails.env != 'test' 
  CarrierWave.configure do |config|
    config.fog_credentials = {
      provider: 'Google',
      google_storage_access_key_id: '',
      google_storage_secret_access_key: ENV['GOOGLE_CLOUD_STORAGE_API_KEY']
    }
    config.fog_directory = 'wroom-rails'
  end
end
