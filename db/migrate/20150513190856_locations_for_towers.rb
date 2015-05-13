class LocationsForTowers < ActiveRecord::Migration
  def change
    add_column :locations, :name, :string
    add_column :towers, :location_id, :integer
  end
end
