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

class User < ActiveRecord::Base
	has_many :runs
	belongs_to :level
end
