var initialize_google_map = function(){
  var width = document.documentElement.clientWidth;
  if ( width < 1000 ){
    var zoom = 5;
  } else {
    var zoom = 7;
  }
  console.log(google);
  var options = {center:{lat: 45.710, lng: -122.959},
  zoom:zoom,
  mapTypeId:google.maps.MapTypeId.TERRAIN};
  var map = new google.maps.Map(document.getElementById('map-canvas'),options);
  console.log(options)
}
var ready = function(){
  initialize_google_map();
  //initialize();
  //cycle();
  $('.time-line').on('click',click_time)l
  $('.opacity-up').on('click',opacityUp);
  $('.opacity-down').on('click',opacityDown);
  $('#avalanche').on('click',avalanche);
  $('#temperature').on('click',temperature);
  $('#map_canvas').on('click',function(){$('iframe').hide();});
}
$(document).on('page:load',ready);
$(document).ready(ready);
