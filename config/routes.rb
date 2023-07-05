# frozen_string_literal: true

Rails.application.routes.draw do
  resources :documents, except: [:show] do
    member do
      patch 'autosave'
      post 'save_as_source'
      post 'save_as_source_from_frame'
      delete 'destroy_from_frame'
      get 'edit_frame'
    end
    collection do
      get 'documents_frame'
      get 'new_frame'
      post 'create_from_frame'
    end
  end
  resources :voices do
    member do
      delete 'delete_from_frame'
    end
  end
  mount ActionCable.server => '/cable'
  resources :conversations do
    member do
      post 'new_user_message'
      post 'new_user_message_from_frame'
      delete 'delete_message'
      get 'show_in_frame'
      delete 'delete_message_from_frame'
      get 'edit_frame'
      patch 'update_from_frame'
    end
  end
  resources :sources do
    member do
      delete 'delete_from_frame'
    end
  end
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
