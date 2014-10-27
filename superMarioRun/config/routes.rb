Rails.application.routes.draw do

  root :to => 'pages#home'

  devise_for :users, :controllers => {
    :omniauth_callbacks => "users/omniauth_callbacks",
    :registrations => 'devise/registrations'
  }

# devise_for :users, :skip => [:sessions, :registrations]
 
  # devise_scope :user do
  #   # make some pretty URLs
  #   get "login" => "devise/sessions#new", :as => :new_user_session
  #   post 'login' => 'devise/sessions#create', :as => :user_session
  #   delete "logout" => "devise/sessions#destroy", :as => :destroy_user_session
  #   # rewrite the registrations URLs so they don't collide with my custom Users Controller
  #   get "signup" => "devise/registrations#new", :as => :new_user_registration
  #   put "update-registration" => "devise/registrations#update", :as => :update_user_registration
  #   delete "delete-registration" => "devise/registrations#destroy", :as => :delete_user_registration
  #   get "edit-registration" => "devise/registrations#edit", :as => :edit_user_registration
  #   get "cancel-registration" => "devise/registrations#cancel", :as => :cancel_user_registration
  #   post "create-registration" => "devise/registrations#create", :as => :user_registration
  # end
 
  # resources :users, :controller => "users"

	# devise_for :user do
 #   		get "/login", :to => "devise/sessions#new" # Add a custom sign in route for user sign in
 #   		get "/logout", :to => "devise/sessions#destroy" # Add a custom sing out route for user sign out
 #   		get "/register", :to => "devise/registrations#new" # Add a Custom Route for Registrations
	# end

  get '/runs/new' => 'runs#new'


  # resources :locations

  resources :runs

  # resources :levels

  resources :users

  

end
