class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :firstname
      t.string :lastname
      t.text :email
      t.string :password_digest
      t.text :avatar
      t.float :height
      t.date :dob
      t.integer :runs_per_week
      t.integer :total_lives
      t.integer :level_id

      t.timestamps
    end
  end
end
