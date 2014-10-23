# == Schema Information
#
# Table name: runs
#
#  id              :integer          not null, primary key
#  total_coins     :float
#  calories        :float
#  user_id         :integer
#  total_mushrooms :float
#  total_turtles   :float
#  start_time      :datetime
#  end_time        :datetime
#  created_at      :datetime
#  updated_at      :datetime
#

class Run < ActiveRecord::Base
	belongs_to :user
	has_many :locations
end
