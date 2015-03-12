class Image < ActiveRecord::Base
  MAX_DELTA = 600

  def self.store(tower,image,time,page)
    success = 0
    if !tower || !image
      return success
    end
    if where(image: image).count < 1
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
