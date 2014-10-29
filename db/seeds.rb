# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Level.destroy_all


## These will be pushed in
level1 = Level.create(:id =>1, :name => 'Level 1', :coin_freq => 10, :mushroom_freq => 25, :turtle_freq => 100, 
				:description => 'Level 1 Run', :coin_threshold => 0, :theme => 'Clouds')
level2 = Level.create(:id => 2, :name => 'Level 2', :coin_freq => 2, :mushroom_freq => 20, :turtle_freq => 200, 
				:description => 'Level 2 Run', :coin_threshold => 100, :theme => 'Garden')
level3 = Level.create(:id => 3, :name => 'Level 3', :coin_freq => 3, :mushroom_freq => 30, :turtle_freq => 300, 
				:description => 'Level 3 Run', :coin_threshold => 200, :theme => 'Hell')
level4 = Level.create(:id => 4, :name => 'Level 4', :coin_freq => 4, :mushroom_freq => 40, :turtle_freq => 400, 
				:description => 'Level 4 Run', :coin_threshold => 300, :theme => '')
level5 = Level.create(:id => 5, :name => 'Level 5', :coin_freq => 5, :mushroom_freq => 50, :turtle_freq => 500, 
				:description => 'Level 5 Run', :coin_threshold => 400, :theme => '')
level6 = Level.create(:id => 6, :name => 'Level 6', :coin_freq => 6, :mushroom_freq => 60, :turtle_freq => 600, 
				:description => 'Level 6 Run', :coin_threshold => 500, :theme => '')
level7 = Level.create(:id => 7, :name => 'Level 7', :coin_freq => 7, :mushroom_freq => 70, :turtle_freq => 700, 
				:description => 'Level 7 Run', :coin_threshold => 600, :theme => '')
level8 = Level.create(:id => 8, :name => 'Level 8', :coin_freq => 8, :mushroom_freq => 80, :turtle_freq => 800, 
				:description => 'Level 8 Run', :coin_threshold => 700, :theme => '')
level9 = Level.create(:id => 8, :name => 'Level 9', :coin_freq => 8, :mushroom_freq => 80, :turtle_freq => 800, 
				:description => 'Level 8 Run', :coin_threshold => 700, :theme => '')

level10 = Level.create(:id => 8, :name => 'Level 10', :coin_freq => 8, :mushroom_freq => 80, :turtle_freq => 800, 
				:description => 'Level 8 Run', :coin_threshold => 700, :theme => '')


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
