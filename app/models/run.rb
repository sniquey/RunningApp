# == Schema Information
#
# Table name: runs
#
#  id               :integer          not null, primary key
#  total_coins      :float
#  calories         :float
#  user_id          :integer
#  total_mushrooms  :float
#  total_turtles    :float
#  start_time       :datetime
#  end_time         :datetime
#  created_at       :datetime
#  updated_at       :datetime
#  coin_counter     :integer
#  mushroom_counter :integer
#  turtle_counter   :integer
#  steps            :integer
#

class Run < ActiveRecord::Base
	belongs_to :user
	has_many :locations

	def coin_counter
		coin_counter = 0
    	self.locations.each do |location|
    		if location.coin == true 
    			coin_counter += 1
    		end
    	end
    	return coin_counter
  	end

	def mushroom_counter
		mushroom_counter = 0
    	self.locations.each do |location|
    		if location.mushroom == true 
    			mushroom_counter += 1
    		end
    	end
    	return mushroom_counter
  	end

	def turtle_counter
		turtle_counter = 0
    	self.locations.each do |location|
    		if location.turtle == true 
    			turtle_counter += 1
    		end
    	end
    	return turtle_counter
  	end

end
