# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  firstname       :string(255)
#  lastname        :string(255)
#  email           :text
#  password_digest :string(255)
#  avatar          :text
#  height          :float
#  dob             :date
#  runs_per_week   :integer
#  total_lives     :integer
#  level_id        :integer
#  created_at      :datetime
#  updated_at      :datetime
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
