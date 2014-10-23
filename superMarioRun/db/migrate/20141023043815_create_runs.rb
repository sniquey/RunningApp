class CreateRuns < ActiveRecord::Migration
  def change
    create_table :runs do |t|
      t.float :total_coins
      t.float :calories
      t.integer :user_id
      t.float :total_mushrooms
      t.float :total_turtles
      t.datetime :start_time
      t.datetime :end_time

      t.timestamps
    end
  end
end
