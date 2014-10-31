class PagesController < ApplicationController
  def home
	  	# coins_array = current_user.locations.select { |location| location.coin == true }
	  	# @total_coins = coins_array.length
		@total_coins = 0
		@total_coins = current_user.locations.where(:coin => true).count
		@total_mushrooms = 0
		@total_mushrooms = current_user.locations.where(:mushroom => true).count

	
	  	# distance_sum = 0
	  	# current_user.locations.each {|location| distance_sum += location.distance_from_last }
	  	total_distance = current_user.distance_sum.round(2)
	  	km, mm = total_distance.divmod(1000)
	  	@total_distance = "%dkm %dm" % [km, mm]

	  	run_time = 0
	  	current_user.runs.each {|run| 
	  		if run.locations.length > 0
		  		run_time += (run.locations.last.created_at - run.locations.first.created_at)
			end
	  	}
	  	total_time = run_time.round(2) 	# Time in seconds
		mm, ss = total_time.divmod(60)            
		hh, mm = mm.divmod(60)           
		@total_time =  "%d:%d:%d" % [hh, mm, ss]


	  	# Calculating levels
	  	level_array = []
	  	level_counter = 0
	  	Level.all.each do |level|
	  		level_array << level.coin_threshold
	  		if level.coin_threshold < @total_coins
	  			level_counter += 1
	  		end
	  	end
	  	current_user.maybe_update_levels

	  	if @total_coins == 0 	# Conditional based on zero coins
		  	@next_threshold = 100 
		  	@coins_to_next = 100
		  	@percentage_completion = 0		
  		else					
		  	@next_threshold = Level.all[level_counter].coin_threshold.to_f
		  	@coins_to_next = (@next_threshold - @total_coins).to_f
		  	@percentage_completion = ((@total_coins - Level.all[level_counter - 1].coin_threshold.to_f )/(@next_threshold - Level.all[level_counter - 1].coin_threshold.to_f ))*100.to_f		## "%0.2f" % 
		end

		@total_steps = 0;
		current_user.runs.each do |run|
			if run.steps != nil
				@total_steps += run.steps
			end
		end

  end

  def info
  end
end
