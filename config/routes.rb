# frozen_string_literal: true

Rails.application.routes.draw do
  resources :conversations do
    member do
      post 'new_user_message'
    end
  end
  resources :documents
  devise_for :users
  resources :users, except: %i[new create]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'conversations#index'
end
