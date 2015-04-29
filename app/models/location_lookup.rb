class LocationLookup < ActiveRecord::Base

  def create(location_id,tower_id)
    l = new
    l.rank = where(location_id: location_id, tower_id: tower_id).count + 1
    l.location_id = location_id
    l.tower_id = tower_id
    l.save
  end

end
