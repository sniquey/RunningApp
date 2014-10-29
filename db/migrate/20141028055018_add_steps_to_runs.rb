class AddStepsToRuns < ActiveRecord::Migration
  def change
    add_column :runs, :steps, :integer
  end
end
