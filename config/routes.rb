Rails.application.routes.draw do
  root to: 'tests#index'
  resources :towers
  resources :images
  resources :locations
end
