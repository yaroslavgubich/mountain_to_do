Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"

  resource :profile, only: %i[show update]

  resources :goals do
    resources :tasks, only: [:edit, :update, :destroy, :create, :new, :show]
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.

  # Defines the root path route ("/")
  # root "posts#index"
end
