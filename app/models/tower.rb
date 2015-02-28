class Tower < ActiveRecord::Base

  def open_page(page)
    Nokogiri::HTML(open(page))
  end

  def scan
    page = "http://radar.weather.gov/ridge/RadarImg/N0R/#{self.rid}"
    page = open_page(page)
    page = page.css('body').css('table').css('tr').css('td')[2]
    page
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
