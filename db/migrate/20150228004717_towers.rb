class Towers < ActiveRecord::Migration
  def change
    create_table :towers do |t|
      t.string :rid
      t.string :city
      t.string :state
      t.string :sw_lat
      t.string :sw_long
      t.string :ne_lat
      t.string :ne_long 
      t.string :center_lat
      t.string :center_long
      t.timestamps
    end
    create_table :images do |t|
      t.integer   :tower_id
      t.timestamp :time
      t.timestamps
    end
    create_table :locations do |t|
      t.string :state
      t.string :city
      t.timestamps
    end
    create_table :location_lookups do |t|
      t.integer :rank
      t.integer :tower_id
      t.integer :location_id
      t.timestamps
    end
  end
end
