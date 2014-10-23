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

require 'test_helper'

class RunTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
