json.array!(@runs) do |run|
  json.extract! run, :id, :coins, :calories, :user_id, :mushrooms, :turtles, :start_time, :end_time
  json.url run_url(run, format: :json)
end
