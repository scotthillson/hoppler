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

var initialize = function(){
  initialize_google_map();
  //new_overlay_from_bounds(43.07, -126.02, 48.34, -119.85); // portland
  //new_overlay_from_bounds(44.40, -127.24, 49.81, -120.91); // langley
  //new_overlay_from_bounds(44.43, -125.69, 50.94, -119.24); // seattle
  //new_overlay_from_bounds(39.60, -125.58, 44.55, -119.74); // medford
  //get_temps();
}
