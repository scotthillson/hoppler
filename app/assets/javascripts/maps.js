var newOverlay;
newOverlay.prototype = new google.maps.OverlayView();
var new_overlay_from_bounds = function(swlat,swlng,nelat,nelng){
  var swBound = new google.maps.LatLng(swlat,swlng);
  var neBound = new google.maps.LatLng(nelat,nelng);
  var bounds = new google.maps.LatLngBounds(swBound, neBound);
  new newOverlay(bounds,'radar');
}
var set_overlay = function(bounds, overlay_class){
  this.bounds_ = bounds;
  if (overlay_class == 'radar') {this.image_ = '';}
  this.map_ = map;
  this.div_ = null;
  this.overlay_class = overlay_class;
this.setMap(map);
}
//an overlay's receipt of onAdd() indicates that the map's panes are now available for attaching the overlay to the map via the dom
newOverlay.prototype.onAdd = function(){
  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';
  div.className = this.overlay_class;
  if (this.overlay_class == 'radar'){
    var img = document.createElement('img');
    img.src = this.image_;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.position = 'absolute';
    img.className = 'image';
    div.appendChild(img);
    div.style.zIndex
  }
  this.div_ = div;
  //we add an overlay to a map via one of the map's panes. We'll add this overlay to the overlayLayer pane.
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);    
  colors(this.overlay_class);
}
newOverlay.prototype.draw = function(){
  //retrieve the southwest and northeast cords of this overlay in latlngs and convert them to pixels cords
  var overlayProjection = this.getProjection();
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
}
