class PagesController < ApplicationController
  def home
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



	  	# Calculating levels
	  	level_array = []
	  	level_counter = 0
	  	Level.all.each do |level|
	  		level_array << level.coin_threshold
	  		if level.coin_threshold < @total_coins
	  			level_counter += 1
	  		end
	  	end

	  	@current_user.level = Level.all[level_counter - 1]
	  	@next_threshold = Level.all[level_counter].coin_threshold.to_f 
	  	@coins_to_next = (@next_threshold - @total_coins).to_f
	  	@percentage_completion = (@total_coins/@next_threshold)*100.to_f		## "%0.2f" % 


  	# raise 'current_user'

  end

  def info
  end
end
