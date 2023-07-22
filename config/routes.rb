# frozen_string_literal: true

Rails.application.routes.draw do # rubocop:disable Metrics/BlockLength
  resources :projects, except: [:show] do
    member do
      patch 'autosave'
      get 'editor'
    end
  end
  resources :voices
  mount ActionCable.server => '/cable'
  resources :conversations, only: [] do
    member do
      post 'new_message'
      get 'chat'
      delete 'delete_message'
      get 'settings'
      patch 'update_settings'
      delete 'clear_chat'
      get 'cancel_processing'
    end
  end
  resources :sources, except: [:index]
  devise_for :users, controllers: {
    confirmations: 'confirmations',
    registrations: 'registrations',
    sessions: 'sessions'
  }
  resources :users, except: %i[new create]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '/monitoring', to: 'monitoring#index'
  get '/wroom', to: 'wroom#app'
  root 'wroom#app'
end
