Rails.application.routes.draw do

  root to: 'locations#show', id:'Oregon'

  resources :locations
  get 'location_point', to: 'locations#point'

  resources :towers

  resources :images
  get 'manifest', to: 'images#manifest'

end
