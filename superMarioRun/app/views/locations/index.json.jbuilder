json.array!(@locations) do |location|
  json.extract! location, :id, :latitude, :longitude, :distance_from_last, :run_id, :coin, :cummulative_distance
  json.url location_url(location, format: :json)
end
