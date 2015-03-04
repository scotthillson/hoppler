var temps = new Array();

var temperature = function(){
  $('.temperature').toggle();
}

var colors = function(temp){
  temp = temp.split(' ')[1];
  var r = red(temp);
  var g = green(temp);
  var b = blue(temp);
  var rgb = r+','+g+','+b;
  $('.'+temp).css('background-color','rgb('+rgb+')').attr('title',temp);
}

var get_temps_success = function(data){
  var temp_class;
  var bounds;
  var temp;
  var lat;
  var lng;
  var arr;
  var sw;
  var ne;
  for( h = 0 ; h < temps.length ; h++ ){
    arr = data[h].split(' ')
    lat = parseFloat(arr[0]);
    lng = parseFloat(arr[1]);
    temp = arr[2];
    temps.push(temp);
    temp_class = 'temperature ' + temp;
    sw = new google.maps.LatLng(lat-.007,lng-.01);
    ne = new google.maps.LatLng(lat+.007,lng+.01);
    bounds = new google.maps.LatLngBounds(sw, ne);
    new newOverlay(bounds, map, temp_class);
  }
  temps = temps.sort();
  var max = temps[temps.length-1];
  var min = temps[0];
}

var get_temps = function(map){
  ajax('','GET','json','/temps/',get_temps_success);
}
