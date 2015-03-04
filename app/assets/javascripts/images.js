var gather_images = function(tower){
  ajax('','GET','json','/towers/'+tower['id'],images_success,tower);
}

var images_success = function(data,tower){
  var path = 'http://radar.weather.gov/ridge/RadarImg/N0R/'+tower['rid']+'/';
  $.each(data,function(i,img){
    var sw_lat = Number(tower['sw_lat']);
    var sw_lng = Number(tower['sw_long']);
    var ne_lat = Number(tower['ne_lat']);
    var ne_lng = Number(tower['ne_long']);
    new_nexrad_overlay(sw_lat,sw_lng,ne_lat,ne_lng,path+img['image']);
  });
}
