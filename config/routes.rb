# frozen_string_literal: true

Rails.application.routes.draw do # rubocop:disable Metrics/BlockLength
  resources :wroom_projects
  resources :projects, except: %i[index show] do
    member do
      patch 'autosave'
      post 'save_as_source'
      get 'save_as_source_from_frame'
      delete 'destroy_from_frame'
      get 'edit_frame'
    end
  end
  resources :voices, except: %i[index show] do
    member do
      delete 'delete_from_frame'
    end
  end
  mount ActionCable.server => '/cable'
  resources :conversations, only: [] do
    member do
      post 'new_user_message_from_frame'
      get 'show_in_frame'
      delete 'delete_message_from_frame'
      get 'edit_frame'
      patch 'update_from_frame'
      delete 'clear_chat'
    end
  end
  resources :sources, except: [:index] do
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
  resources :folders do
    collection do
    end
    get 'root_folder'
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '/monitoring', to: 'monitoring#index'
  get '/wroom', to: 'wroom#app', as: :wroom_app
  root 'folders#root_folder'
end
