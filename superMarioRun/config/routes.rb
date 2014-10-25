Rails.application.routes.draw do

  root :to => 'pages#home'

  #devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  # get '/dashboard' => 'home#dashboard', :as => 'user_root'

	devise_for :user do
   		get "/login", :to => "devise/sessions#new" # Add a custom sign in route for user sign in
   		get "/logout", :to => "devise/sessions#destroy" # Add a custom sing out route for user sign out
   		get "/register", :to => "devise/registrations#new" # Add a Custom Route for Registrations
	end

  resources :locations

  resources :runs

  resources :levels

  resources :users

  

end
