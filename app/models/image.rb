class Image < ActiveRecord::Base

  MAX_DELTA = 600

  def self.store(tower,image,time,page)
    success = 0
    if !tower || !image
      return success
    end
    if where(image:image).count < 1
      i = new
      i.tower_id = tower.id
      i.image = image
      i.time = time
      if upload_image page, image
        i.save
        success = 1
      end
    end
    success
  end

  def self.upload_image page, image
    i = 0
    tries = 5
    success = false
    file_path = "#{page}/#{image}"
    while i < tries
      begin
        file = open file_path
      rescue
        i += 1
        puts "repeat #{image}"
        sleep(1/2)
      else
        Upload.upload_file file, image
        success = true
        break
      end
    end
    success
  end

  def self.make_tower_hash
    tower_hash = Hash.new
    images = Image.all
    images.each do |img|
      tower_hash[img.tower_id] ||= []
      tower_hash[img.tower_id].push img
    end
    tower_hash
  end

  def self.make_time_hash tower_hash
    time_hash = Hash.new
    tower_hash[1].each do |img|
      hash = Hash.new
      hash[1] = img.time
      time_hash[img.image] = hash
    end
    time_hash
  end

  def self.make_img_hash tower_hash
    img_hash = Hash.new
    tower_hash[1].each do |img|
      hash = Hash.new
      hash[1] = img.image
      img_hash[img.image] = hash
    end
    img_hash
  end

  def self.dif img, comp
    (img.time - comp).abs
  end

end
