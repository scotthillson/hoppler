class Image < ActiveRecord::Base

  def self.store(tower,image,time)
    if !tower || !image
      return false
    end
    if !where(image: image)
      i = new
      i.tower_id = towe.id
      i.image = image
      i.time = time
      i.save
    end
    true
  end

end
