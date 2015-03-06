class Uploads < ActiveRecord::Migration
  def change
    create_table :uploads do |t|
      t.string :url
      t.string :note
      t.timestamps
    end
  end
end
