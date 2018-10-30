class Tower < ActiveRecord::Base

  has_many :images
  belongs_to :location

  PATH = 'https://radar.weather.gov/ridge/RadarImg/N0R/'

  def open_page page
    Nokogiri::HTML(open(page))
  end

  def self.populate
    adds = 0
    all.each do |tower|
      adds += tower.scan
    end
    adds
  end

  def scan
    self.estimator
    images = self.images.pluck(:image)
    adds = 0
    page = "#{PATH}#{self.rid}"
    open = open_page(page)
    open = open.css('body').css('table').search('tr').each do |r|
      if r.search('td')[1] && r.search('td')[2]
        if r.search('td')[1].text.include? 'gif'
          image = r.search('td')[1].text
          time = Time.parse(r.search('td')[2].text)+Time.now.utc_offset()
          if !images.include? image
            adds += Image.store(self,image,time,page)
          end
        end
      end
    end
    adds
  end

  def estimator
    if self.center_lat
      if self.sw_lat.blank?
        if self.est_sw_lat.blank?
          self.est_sw_lat = self.center_lat.to_f - Tower.averager('sw_lat')
          self.save
        end
      end
      if self.ne_lat.blank?
        if self.est_ne_lat.blank?
          self.est_ne_lat = self.center_lat.to_f - Tower.averager('ne_lat')
          self.save
        end
      end
    end
    if self.center_lng
      if self.sw_lng.blank?
        if self.est_sw_lng.blank?
          self.est_sw_lng = self.center_lng.to_f - Tower.averager('sw_lng')
          self.save
        end
      end
      if self.ne_lng.blank?
        if est_ne_lng.blank?
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
        if t.sw_lat.present? && t.center_lat.present?
          dif = t.center_lat.to_f - t.sw_lat.to_f
          difs.push dif
        end
      end
      return difs.inject{ |sum, el| sum + el }.to_f / difs.size
    end
    if param == 'ne_lat'
      towers.each do |t|
        if t.ne_lat.present? && t.center_lat.present?
          dif = t.center_lat.to_f - t.ne_lat.to_f
          difs.push dif
        end
      end
      return difs.inject{ |sum, el| sum + el }.to_f / difs.size
    end
    if param == 'sw_lng'
      towers.each do |t|
        if t.sw_lng.present? && t.center_lng.present?
          dif = t.center_lng.to_f - t.sw_lng.to_f
          difs.push dif
        end
      end
      return difs.inject{ |sum, el| sum + el }.to_f / difs.size 
    end
    if param =='ne_lng'
      towers.each do |t|
        if t.ne_lng.present? && t.center_lng.present?
          dif = t.center_lng.to_f - t.ne_lng.to_f if t.ne_lng
          difs.push dif
        end
      end
      return difs.inject{ |sum, el| sum + el }.to_f / difs.size
    end
  end

end
