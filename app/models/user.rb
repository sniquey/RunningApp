# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  name                   :string(255)
#  password_digest        :string(255)
#  avatar                 :text
#  height                 :float
#  dob                    :date
#  runs_per_week          :integer
#  total_lives            :integer
#  level_id               :integer
#  created_at             :datetime
#  updated_at             :datetime
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  provider               :string(255)
#  uid                    :string(255)
#  picture                :string(255)
#  gender                 :string(255)
#

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable


  attr_accessor :current_password
  mount_uploader :picture, PictureUploader
  devise :omniauthable, :omniauth_providers => [:facebook]
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates_confirmation_of :password # Shouldn't Devise handle this for us?

	has_many :runs
	has_many :locations, :through => :runs # This is okay
  belongs_to :level


  after_initialize :defaults

  def defaults
     unless persisted?
      self.level_id = 1
      self.total_lives = 3
      self.avatar = ""
      self.height = 1.70
      self.dob = Date.parse("11/11/1990")
      self.runs_per_week = 3
    end
  end

  def maybe_update_levels
    # figure out how many coins the user has and which levels they need to be at
    ## whenever needed call current_user.maybe_update_levels
    # only exist wherever needed 
    total_coins = 0
    total_coins = self.locations.where(:coin => true).count

    level_array = []
    level_counter = 0
    Level.all.each do |level|
      level_array << level.coin_threshold
      if level.coin_threshold < total_coins
        level_counter += 1
      end
    end

    if total_coins == 0 
      self.level = Level.all[level_counter]
    else 
      self.level = Level.all[level_counter - 1]
    end

    self.save
  # binding.pry
  end

  def distance_sum
    self.locations.inject(0) {|sum, location| sum += location.distance_from_last }    
  end

	def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
    user = User.where(:provider => auth.provider, :uid => auth.uid).first
    if user
      return user
    else
      registered_user = User.where(:email => auth.info.email).first
      if registered_user
        return registered_user
      else
        user = User.create(name:auth.extra.raw_info.name,
                            provider:auth.provider,
                            uid:auth.uid,
                            email:auth.info.email,
                            password:Devise.friendly_token[0,20],
                          )
      end
  	end
  end 


  def user_coin_count 
    coin_count = 0
    self.locations.each do |location|
      if location.coin == true
        coin_count += 1
      end
    end
    return coin_count
  end


end
