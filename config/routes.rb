# frozen_string_literal: true

Rails.application.routes.draw do
  resources :documents, except: [:show] do
    member do
      patch 'autosave'
    end
  end
  resources :voices
  mount ActionCable.server => '/cable'
  resources :conversations do
    member do
      post 'new_user_message'
      delete 'delete_message'
    end
  end
  resources :sources
  devise_for :users, controllers: {
    confirmations: 'confirmations',
    registrations: 'registrations'
  }
  resources :users, except: %i[new create]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root 'documents#index'
end
