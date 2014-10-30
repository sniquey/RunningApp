# == Route Map
#
#                   Prefix Verb     URI Pattern                            Controller#Action
#                     root GET      /                                      pages#home
#  user_omniauth_authorize GET|POST /users/auth/:provider(.:format)        users/omniauth_callbacks#passthru {:provider=>/facebook/}
#   user_omniauth_callback GET|POST /users/auth/:action/callback(.:format) users/omniauth_callbacks#:action
#         new_user_session GET      /users/sign_in(.:format)               devise/sessions#new
#             user_session POST     /users/sign_in(.:format)               devise/sessions#create
#     destroy_user_session DELETE   /users/sign_out(.:format)              devise/sessions#destroy
#            user_password POST     /users/password(.:format)              devise/passwords#create
#        new_user_password GET      /users/password/new(.:format)          devise/passwords#new
#       edit_user_password GET      /users/password/edit(.:format)         devise/passwords#edit
#                          PATCH    /users/password(.:format)              devise/passwords#update
#                          PUT      /users/password(.:format)              devise/passwords#update
# cancel_user_registration GET      /users/cancel(.:format)                devise/registrations#cancel
#        user_registration POST     /users(.:format)                       devise/registrations#create
#    new_user_registration GET      /users/sign_up(.:format)               devise/registrations#new
#   edit_user_registration GET      /users/edit(.:format)                  devise/registrations#edit
#                          PATCH    /users(.:format)                       devise/registrations#update
#                          PUT      /users(.:format)                       devise/registrations#update
#                          DELETE   /users(.:format)                       devise/registrations#destroy
#                locations GET      /locations(.:format)                   locations#index
#                          POST     /locations(.:format)                   locations#create
#             new_location GET      /locations/new(.:format)               locations#new
#            edit_location GET      /locations/:id/edit(.:format)          locations#edit
#                 location GET      /locations/:id(.:format)               locations#show
#                          PATCH    /locations/:id(.:format)               locations#update
#                          PUT      /locations/:id(.:format)               locations#update
#                          DELETE   /locations/:id(.:format)               locations#destroy
#                     runs GET      /runs(.:format)                        runs#index
#                          POST     /runs(.:format)                        runs#create
#                  new_run GET      /runs/new(.:format)                    runs#new
#                 edit_run GET      /runs/:id/edit(.:format)               runs#edit
#                      run GET      /runs/:id(.:format)                    runs#show
#                          PATCH    /runs/:id(.:format)                    runs#update
#                          PUT      /runs/:id(.:format)                    runs#update
#                          DELETE   /runs/:id(.:format)                    runs#destroy
#                   levels GET      /levels(.:format)                      levels#index
#                          POST     /levels(.:format)                      levels#create
#                new_level GET      /levels/new(.:format)                  levels#new
#               edit_level GET      /levels/:id/edit(.:format)             levels#edit
#                    level GET      /levels/:id(.:format)                  levels#show
#                          PATCH    /levels/:id(.:format)                  levels#update
#                          PUT      /levels/:id(.:format)                  levels#update
#                          DELETE   /levels/:id(.:format)                  levels#destroy
#                    users GET      /users(.:format)                       users#index
#                          POST     /users(.:format)                       users#create
#                 new_user GET      /users/new(.:format)                   users#new
#                edit_user GET      /users/:id/edit(.:format)              users#edit
#                     user GET      /users/:id(.:format)                   users#show
#                          PATCH    /users/:id(.:format)                   users#update
#                          PUT      /users/:id(.:format)                   users#update
#                          DELETE   /users/:id(.:format)                   users#destroy
#

Rails.application.routes.draw do

  root :to => 'pages#home'

  devise_for :users, :controllers => {
    :omniauth_callbacks => "users/omniauth_callbacks",
    :registrations => 'devise/registrations'
  }
  get '/testing' => 'runs#testing'  

  get '/runs/new' => 'runs#new'

  get '/users/:id' => 'pages#home'


  resources :locations

  post '/runs/steps' => 'runs#step_update'
  resources :runs

  resources :levels

  resources :users

  

end
