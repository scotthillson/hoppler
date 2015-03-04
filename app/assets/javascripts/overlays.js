var new_radar_overlay = function(swlat,swlng,nelat,nelng,img){
  var swBound = new google.maps.LatLng(swlat,swlng);
  var neBound = new google.maps.LatLng(nelat,nelng);
  var bounds = new google.maps.LatLngBounds(swBound, neBound);
  new newOverlay(bounds,'radar-overlay',img);
}

newOverlay.prototype.onAdd = function(){
    var div = document.createElement('div');
    div.style.borderStyle = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';
    div.className = this.className;
    if (this.className == 'radar-overlay'){
        var img = document.createElement('img');
        img.src = this.image_;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.position = 'absolute';
        //img.className = 'image';
        div.appendChild(img);
        div.style.zIndex
    }
    this.div_ = div;
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
}

newOverlay.prototype.draw = function() {
  // We use the south-west and north-east
  // coordinates of the overlay to peg it to the correct position and size.
  // To do this, we need to retrieve the projection from the overlay.
  var overlayProjection = this.getProjection();
  // Retrieve the south-west and north-east coordinates of this overlay
  // in LatLngs and convert them to pixel coordinates.
  // We'll use these coordinates to resize the div.
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
  // Resize the image's div to fit the indicated dimensions.
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
};