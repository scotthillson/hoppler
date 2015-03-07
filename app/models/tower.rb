class Tower < ActiveRecord::Base
  PATH = 'http://radar.weather.gov/ridge/RadarImg/N0R/'
  has_many :images

  def open_page(page)
    Nokogiri::HTML(open(page))
  end

  def self.populate
    all.each do |t|
      t.scan
    end
  end

  def scan
    page = "#{PATH}#{self.rid}"
    open = open_page(page)
    open = open.css('body').css('table').search('tr').each do |r|
      if r.search('td')[1] && r.search('td')[2]
        if r.search('td')[1].text.include? 'gif'
          image = r.search('td')[1].text
          time = r.search('td')[2].text
          Image.store(self,image,time,page)
        end
      end
    end
  end

  def generate(rid,sw_lat,sw_lng,ne_lat,ne_lng,center_lat,center_lng,city,state)
    t = new
    t.rid = rid
    t.sw_lat = sw_lat
    t.sw_long = sw_lng
    t.ne_lat = ne_lat
    t.ne_long = ne_lng
    t.center_lat = center_lat
    t.center_long = center_lng
    t.city = city
    t.state = state
    t.save
  end

  def self.averager
    towers = all
    puts 'sw lat'
    difs = []
    towers.each do |t|
      dif = t.center_lat.to_f - t.sw_lat.to_f
      difs.push dif
      #puts ( dif )
    end
    puts difs.inject{ |sum, el| sum + el }.to_f / difs.size
    
    puts 'ne lat'
    difs = []
    towers.each do |t|
      dif = t.center_lat.to_f - t.ne_lat.to_f
      difs.push dif
      #puts ( dif )
    end
    puts difs.inject{ |sum, el| sum + el }.to_f / difs.size
    
    puts 'sw lng'
    difs = []
    towers.each do |t|
      dif = t.center_lng.to_f - t.sw_lng.to_f
      difs.push dif
      #puts ( dif )
    end
    puts difs.inject{ |sum, el| sum + el }.to_f / difs.size
    
    puts 'ne lng'
    difs = []
    towers.each do |t|
      dif = t.center_lng.to_f - t.ne_lng.to_f
      difs.push dif
      #puts ( dif )
    end
    difs.inject{ |sum, el| sum + el }.to_f / difs.size
  end

end
