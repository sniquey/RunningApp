class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.float :latitude
      t.float :longitude
      t.float :distance_from_last
      t.integer :run_id
      t.boolean :coin
      t.float :cummulative_distance
      t.boolean :mushroom
      t.boolean :turtle

      t.timestamps
    end
  end
end
