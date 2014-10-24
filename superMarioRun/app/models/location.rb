# == Schema Information
#
# Table name: locations
#
#  id                   :integer          not null, primary key
#  latitude             :float
#  longitude            :float
#  distance_from_last   :float
#  run_id               :integer
#  coin                 :boolean
#  cummulative_distance :float
#  mushroom             :boolean
#  turtle               :boolean
#  created_at           :datetime
#  updated_at           :datetime
#

class Location < ActiveRecord::Base
	belongs_to :run

	def calcdistance 
		# self.run.locations.last - run.locations.

	end
end
