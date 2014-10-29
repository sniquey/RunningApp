class PagesController < ApplicationController
  def home
  	# raise 'current_user'
	  	coins_array = current_user.locations.select { |location| location.coin == true }
	  	@total_coins = coins_array.length

	  	# distance_sum = 0
	  	# current_user.locations.each {|location| distance_sum += location.distance_from_last }
	  	@total_distance = current_user.distance_sum.round(2)

	  	run_time = 0
	  	current_user.runs.each {|run| 
	  		if run.locations.length > 0
		  		run_time += (run.locations.last.created_at - run.locations.first.created_at)
			end
	  	}
	  	@total_time = run_time.round(2)

	  	# total_distance = current_user.locations {|location| location.distance_from_last }
	  	# current_user.total_distance = 0
  end

  def info
  end
end
