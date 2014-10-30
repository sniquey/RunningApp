json.array!(@runs) do |run|
  json.extract! run, :id, :steps, :total_coins, :calories, :user_id, :total_mushrooms, :total_turtles, :start_time, :end_time, :created_at, :updated_at
  json.url run_url(run, format: :json)
end
