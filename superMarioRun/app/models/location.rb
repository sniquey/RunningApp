# == Schema Information
#
# Table name: locations
#
#  id                  :integer          not null, primary key
#  latitude            :float
#  longitude           :float
#  distance_from_last  :float
#  run_id              :integer
#  coin                :boolean
#  cumulative_distance :float
#  mushroom            :boolean
#  turtle              :boolean
#  created_at          :datetime
#  updated_at          :datetime
#

class Location < ActiveRecord::Base
	belongs_to :run

    # last_location = current_user.runs.last.locations.last
    # @location = Location.new(location_params)
    # @location.distance_from_last = @location.latlong - last_location.latlong

	def calcDistance 	# Calculates 'distance_from_last' i.e. distance between last location and second last location
		## Finding the current and last location
		current_location = self
		if self.run.locations.length == 0 
			last_location = self
		else 
			last_location = self.run.locations[self.run.locations.length - 1]			
		end
		# print "Current Location #{current_location}" 

		lat1 = current_location.latitude
		long1 = current_location.longitude
		lat2 = last_location.latitude
		long2 = last_location.longitude

		  dtor = Math::PI/180
		  r = 6378.14*1000
		 
		  rlat1 = lat1 * dtor 
		  rlong1 = long1 * dtor 
		  rlat2 = lat2 * dtor 
		  rlong2 = long2 * dtor 
		 
		  dlon = rlong1 - rlong2
		  dlat = rlat1 - rlat2
		 
		  a = (Math.sin(dlat/2)**2) + Math.cos(rlat1) * Math.cos(rlat2) * ((Math.sin(dlon/2)**2))
		  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
		  d = r * c
		 
		  return d
	end

	def calcCumulativeDistance # Calculates 'cumulative_distance'
		cumulative_distance_sum = 0
		self.run.locations.all.each do |location|
			cumulative_distance_sum += location.distance_from_last ## Should try to find a way to incorporate inject
		end
		cumulative_distance_sum += self.calcDistance
		return cumulative_distance_sum
	end

	coin_counter = 0
	def coinsPresent(coin_counter)
		user_level = current_user.level
		if self.calcCumulativeDistance 
		end
	end

	def mushroomPresent
		
	end

	def turtlePresent

	end
	 
end
