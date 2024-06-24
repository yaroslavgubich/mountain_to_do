class AddStartDateToGoals < ActiveRecord::Migration[7.1]
  def change
    add_column :goals, :start_date, :date
  end
end
