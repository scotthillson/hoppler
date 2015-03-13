Rails.application.routes.draw do
  root to: 'tests#index'

  resources :towers

  resources :images
  get 'manifest', to: 'images#manifest'

  resources :locations
end
