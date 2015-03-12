class Tower < ActiveRecord::Base
  PATH = 'http://radar.weather.gov/ridge/RadarImg/N0R/'
  has_many :images

  def open_page page
    Nokogiri::HTML(open(page))
  end

  def self.populate
    adds = 0
    all.each do |t|
      adds += t.scan
    end
    adds
  end

  def scan
    self.estimator
    adds = 0
    page = "#{PATH}#{self.rid}"
    open = open_page(page)
    open = open.css('body').css('table').search('tr').each do |r|
      if r.search('td')[1] && r.search('td')[2]
        if r.search('td')[1].text.include? 'gif'
          image = r.search('td')[1].text
          time = r.search('td')[2].text
          adds += Image.store(self,image,time,page)
        end
      end
    end
    adds
  end

  def estimator
    if self.center_lat
      if self.sw_lat == nil
        if self.est_sw_lat == nil
          self.est_sw_lat = self.center_lat.to_f - Tower.averager('sw_lat')
          self.save
        end
      end
      if self.ne_lat == nil
        if self.est_ne_lat == nil
          self.est_ne_lat = self.center_lat.to_f - Tower.averager('ne_lat')
          self.save
        end
      end
    end
    if self.center_lng
      if self.sw_lng == nil
        if self.est_sw_lng == nil
          self.est_sw_lng = self.center_lng.to_f - Tower.averager('sw_lng')
          self.save
        end
      end
      if self.ne_lng == nil
        if est_ne_lng == nil
          self.est_ne_lng = self.center_lng.to_f - Tower.averager('ne_lng')
          self.save
        end
      end
    end
  end

  def self.generate(rid,sw_lat,sw_lng,ne_lat,ne_lng,center_lat,center_lng,city,state)
    t = new
    t.rid = rid
    t.city = city
    t.state = state
    t.sw_lat = sw_lat
    t.sw_lng = sw_lng
    t.ne_lat = ne_lat
    t.ne_lng = ne_lng
    t.center_lat = center_lat
    t.center_lng = center_lng
    t.save
  end

  def self.averager param
    towers = all
    difs = []
    if param == 'sw_lat'
      towers.each do |t|
        if t.sw_lat && t.center_lat
          dif = t.center_lat.to_f - t.sw_lat.to_f
          difs.push dif
        end
      end
      return difs.inject{ |sum, el| sum + el }.to_f / difs.size
    end
    if param == 'ne_lat'
      towers.each do |t|
        if t.ne_lat && t.center_lat
          dif = t.center_lat.to_f - t.ne_lat.to_f
          difs.push dif
        end
      end
      return difs.inject{ |sum, el| sum + el }.to_f / difs.size
    end
    if param == 'sw_lng'
      towers.each do |t|
        if t.sw_lng && t.center_lng
          dif = t.center_lng.to_f - t.sw_lng.to_f
          difs.push dif
        end
      end
      return difs.inject{ |sum, el| sum + el }.to_f / difs.size 
    end
    if param =='ne_lng'
      towers.each do |t|
        if t.ne_lng && t.center_lng
          dif = t.center_lng.to_f - t.ne_lng.to_f if t.ne_lng
          difs.push dif
        end
      end
      return difs.inject{ |sum, el| sum + el }.to_f / difs.size
    end
  end

end
