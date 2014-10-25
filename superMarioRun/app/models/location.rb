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
# require 'geocoder'
# require 'geokit' 

class Location < ActiveRecord::Base
	belongs_to :run

    # last_location = current_user.runs.last.locations.last
    # @location = Location.new(location_params)
    # @location.distance_from_last = @location.latlong - last_location.latlong


	def calcDistance 	# Calculates 'distance_from_last' i.e. distance between last location and second last location
		## Finding the current and last location
		current_location = self
		if self.run.locations.length > 1 
			last_location = self.run.locations[self.run.locations.length - 2]
		else 
			last_location = self
		end
		# print "Current Location #{current_location}" 

		## Calculating the location difference 
		radius = 6373000 	## The radius of the earth is 6373km
		dlon = last_location.longitude - current_location.longitude
		dlat = last_location.latitude - current_location.latitude
		a = (Math.sin(dlat/2)**2) + (Math.cos(current_location.latitude) * Math.cos(last_location.latitude)*(Math.sin(dlon/2))**2 )
		c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
		distance = radius*c 	
		return distance 
	end

	def calcCumulativeDistance # Calculates 'cumulative_distance'
		cumulative_distance_sum = 0
		self.run.locations.each do |location|
			cumulative_distance_sum += location.distance_from_last ## Should try to find a way to incorporate inject
		end
		return cumulative_distance_sum
	end
end
