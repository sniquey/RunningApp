class CreateLevels < ActiveRecord::Migration
  def change
    create_table :levels do |t|
      t.float :coin_freq
      t.float :mushroom_freq
      t.float :turtle_freq
      t.string :name
      t.text :description
      t.integer :coin_threshold
      t.text :image

      t.timestamps
    end
  end
end
