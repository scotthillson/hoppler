class Estimates < ActiveRecord::Migration
  def change
    add_column :towers, :est_sw_lat, :string
    add_column :towers, :est_sw_lng, :string
    add_column :towers, :est_ne_lat, :string
    add_column :towers, :est_ne_lng, :string
  end
end
