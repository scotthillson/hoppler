nexradOverlay.prototype = new google.maps.OverlayView();

function nexradOverlay(bounds,img){
  this.bounds_ = bounds;
  this.image_ = img;
  this.map_ = map;
  this.div_ = null;
  this.setMap(map);
}

var image_loader = function(img,div){
  div.appendChild(img);
}

var new_nexrad_overlay = function(swlat,swlng,nelat,nelng,img){
  var swBound = new google.maps.LatLng(swlat,swlng);
  var neBound = new google.maps.LatLng(nelat,nelng);
  var bounds = new google.maps.LatLngBounds(swBound, neBound);
  var overlay = new nexradOverlay(bounds,img);
}

nexradOverlay.prototype.onAdd = function(){
  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';
  var img = document.createElement('img');
  img.src = this.image_;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.position = 'absolute';
  $(img).load(image_loader(img,div));
  this.div_ = div;
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
}

nexradOverlay.prototype.draw = function() {
  var overlayProjection = this.getProjection();
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
};
