class Image < ActiveRecord::Base
  MAX_DELTA = 600

  def self.store(tower,image,time,page)
    if !tower || !image
      return false
    end
    if where(image: image).count < 1
      i = new
      i.tower_id = tower.id
      i.image = image
      i.time = time
      if upload_image page, image
        i.save
      end
    end
    true
  end

  def self.upload_image page,image
    file_path = "#{page}/#{image}"
    begin
      file = open file_path
    rescue
      false
    else
      Upload.upload_file file, image
      true
    end
  end

  def self.test
    master_hash = Hash.new
    images = all
    images.each do |i|
      master_hash[i.tower_id] ||= []
      master_hash[i.tower_id].push i.time
    end
    time_array = Array.new
    master_hash[master_hash.keys[0]].each do |v|
      hash = Hash.new
      hash[master_hash.keys[0]] = v
      time_array.push hash
    end
    time_array.each do |v|
      master_hash.keys[1..-1].each do |master_hash_key|
        master_hash[master_hash_key].each do |time|
          if time - v[1] < MAX_DELTA
            v[master_hash_key] = time
          end
        end
      end
    end
    time_array
  end

end
