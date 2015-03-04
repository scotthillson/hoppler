class Image < ActiveRecord::Base

  def self.store(tower,image,time)
    if !tower || !image
      return false
    end
    if where(image: image).count < 1
      i = new
      i.tower_id = tower.id
      i.image = image
      i.time = time
      i.save
    end
    true
  end

end
