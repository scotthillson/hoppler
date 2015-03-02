class Tower < ActiveRecord::Base

  has_many :images

  def open_page(page)
    Nokogiri::HTML(open(page))
  end

  def scan
    page = "http://radar.weather.gov/ridge/RadarImg/N0R/#{self.rid}"
    page = open_page(page)
    page = page.css('body').css('table').search('tr').each do |r|
      if r.search('td')[1] && r.search('td')[2]
        if r.search('td')[1].text.include? 'gif'
          image = r.search('td')[1].text
          time = r.search('td')[2].text
          Image.store(self,image,time)
        end
      end
    end
  end

  def generate(rid,sw_lat,sw_long,ne_lat,ne_long,center_lat,center_long,city,state)
    t = new
    t.rid = rid
    t.sw_lat = sw_lat
    t.sw_long = sw_long
    t.ne_lat = ne_lat
    t.ne_long = ne_long
    t.center_lat = center_lat
    t.center_long = center_long
    t.city = city
    t.state = state
    t.save
  end

end
