class AddCountersToRuns < ActiveRecord::Migration
  def change
    add_column :runs, :coin_counter, :integer  	
    add_column :runs, :mushroom_counter, :integer  	
    add_column :runs, :turtle_counter, :integer  	
  end
end
