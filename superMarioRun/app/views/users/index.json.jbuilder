json.array!(@users) do |user|
  json.extract! user, :id, :firstname, :lastname, :email, :password_digest, :avatar, :height, :dob, :runs_per_week, :lives
  json.url user_url(user, format: :json)
end
