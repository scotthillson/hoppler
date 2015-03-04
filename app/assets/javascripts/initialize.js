var map;
var get_towers = function(){
  ajax('','GET','json','/towers',parse_towers,map);
}

var parse_towers = function(data,map){
  $.each(data,function(i,tower){
    gather_images(tower,map);
  });
}

var initialize = function(){
  var width = document.documentElement.clientWidth;
  if ( width < 1000 ){
    var zoom = 5;
  } else {
    var zoom = 7;
  }
  var options = {center:{lat: 45.710, lng: -122.959},
  zoom:zoom,
  mapTypeId:google.maps.MapTypeId.TERRAIN};
  map = new google.maps.Map(document.getElementById('map-canvas'),options);
  get_towers();
}

var newOverlay = function(bounds,overlay_class,img){
  console.log(bounds);
  // Initialize all properties.
  this.className = overlay_class;
  this.bounds_ = bounds;
  this.image_ = img;
  this.map_ = map;
  // Define a property to hold the image's div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null;

}
