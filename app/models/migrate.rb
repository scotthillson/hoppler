class Migrate < ActiveRecord::Base
  establish_connection :production
  self.table_name = :images
  def self.migrate
    self.table_name = :images
    Image.find_each do |i|
      m = Migrate.create(i.attributes)
    end
    self.table_name = :towers
    Tower.all.each do |t|
      m = Migrate.create(t.attributes)
    end
    self.table_name = :locations
    Location.all.each do |l|
      m = Migrate.create(l.attributes)
    end
    self.table_name = :location_lookups
    LocationLookup.all.each do |l|
      m = Migration.create(l.attributes)
    end
  end
  
end
