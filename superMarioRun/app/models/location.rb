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
require 'geocoder'
require 'geokit' 

class Location < ActiveRecord::Base
	belongs_to :run

    # last_location = current_user.runs.last.locations.last
    # @location = Location.new(location_params)
    # @location.distance_from_last = @location.latlong - last_location.latlong


	def calcDistance 	# Calculates 'distance_from_last' i.e. distance between last location and second last location
		## Finding the current and last location
		current_location = self.run.locations.last
		if self.run.locations.length > 1 
			last_location = self.run.locations[self.run.locations.length - 2]
		else 
			last_location = current_location
		end
		
		## Calculating the location difference 
		## TODO - Need to figure out why distance_to is not being recognised. Likely that current_location is not seen as an address
		current_location_item = [current_location.latitude, current_location.longitude]
		last_location_item = [last_location.latitude, last_location.longitude]		
		return current_location_item.distance_to(last_location_item) 

	end

	def calcCumulativeDistance # Calculates 'cumulative_distance'
		cumulative_distance_sum = 0
		self.run.locations.each do |location|
			cumulative_distance_sum += location.distance_from_last ## Should try to find a way to incorporate inject
		end
		return cumulative_distance_sum
	end
end
