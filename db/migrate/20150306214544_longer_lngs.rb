class LongerLngs < ActiveRecord::Migration
  def change
    rename_column :towers, :center_long, :center_lng
    rename_column :towers, :sw_long, :sw_lng
    rename_column :towers, :ne_long, :ne_lng
  end
end
