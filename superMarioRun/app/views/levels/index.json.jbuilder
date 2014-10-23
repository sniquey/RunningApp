json.array!(@levels) do |level|
  json.extract! level, :id, :coin_freq, :mushroom_freq, :turtle_freq, :name, :description, :coin_threshold, :image
  json.url level_url(level, format: :json)
end
