Rails.application.routes.draw do

  devise_for :users
  root :to => 'pages#home'


  resources :locations

  resources :runs

  resources :levels

  resources :users

end
