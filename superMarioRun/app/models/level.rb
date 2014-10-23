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
#  created_at     :datetime
#  updated_at     :datetime
#

class Level < ActiveRecord::Base
	has_many :users
end
