class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :authenticate_user!


private
#  def render_404
#     render file: 'public/404.html', status: :not_found, layout: false
#   end
# def render_error
#     render file: 'public/500.html', status: :internal_server_error, layout: false
#   end
#   def logged_in?
#     current_user
#   end
#   helper_method :logged_in?
  
 #  def authenticate
	# @current_user = User.find_by(:id => session[:user_id])
	# session[:user_id] = nil unless @current_user.present?
 #  end

  def require_user
    if current_user
      true
    else
      redirect_to new_user_registration_path, notice: "You must be logged in to access that page."
    end
  end


end
