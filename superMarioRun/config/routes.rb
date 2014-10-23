Rails.application.routes.draw do

  root :to => 'pages#home'

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }


  resources :locations

  resources :runs

  resources :levels

  resources :users

end
