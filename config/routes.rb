# frozen_string_literal: true

Rails.application.routes.draw do # rubocop:disable Metrics/BlockLength
  resources :documents, except: %i[show index create] do
    member do
      patch 'autosave'
      get 'editor'
      get 'undiscard'
    end
  end
  resources :folders do
    member do
      get 'explorer'
      get 'undiscard'
    end
    collection do
      get 'recycle_bin'
    end
  end
  resources :voices, except: :show do
    collection do
      get 'manager'
    end
    member do
      get 'undiscard'
    end
  end
  mount ActionCable.server => '/cable'
  resources :conversations, only: [] do
    member do
      post 'new_message'
      get 'chat'
      get 'context'
      delete 'delete_message'
      get 'settings'
      patch 'update_settings'
      delete 'clear_chat'
      get 'cancel_processing'
      patch 'toggle_context'
    end
  end
  resources :sources, except: [:index]
  devise_for :users, controllers: {
    confirmations: 'confirmations',
    registrations: 'registrations',
    sessions: 'sessions'
  }
  resources :users, except: %i[new create index] do
    member do
      get 'toggle_gpt_4'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '/monitoring', to: 'monitoring#index'
  get '/wroom', to: 'wroom#app'
  get '/dashboard', to: 'wroom#dashboard'
  root 'wroom#dashboard'
end
