class IndexMuch < ActiveRecord::Migration
  def change
    add_index :images, :time
  end
end
