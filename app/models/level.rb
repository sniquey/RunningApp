# == Schema Information
#
# Table name: levels
#
#  id             :integer          not null, primary key
#  coin_freq      :float
#  mushroom_freq  :float
#  turtle_freq    :float
#  name           :string(255)
#  description    :text
#  coin_threshold :integer
#  image          :text
#  theme          :string(255)
#  type           :string(255)
#  created_at     :datetime
#  updated_at     :datetime
#

class Level < ActiveRecord::Base
	has_many :users
	has_many :runs, through: :users
	
end
