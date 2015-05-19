nexradOverlay.prototype = new google.maps.OverlayView();
function nexradOverlay(bounds,path,img,tower){
  this.path_ = path;
  this.image_ = img['image'];
  this.time_ = img['time'];
  this.bounds_ = bounds;
  this.tower_ = tower;
  this.div_ = null;
  this.setMap(map);
}
var image_loader = function(img,div,nex){
  images[nex.tower_][nex.time_] = img;
  div.appendChild(img);
  loaded_images.push(img);
  console.log(loaded_images.length);
  console.log(queued_images_length);
  if (loaded_images.length == queued_images.length){
    if (loaded_images.length >= ( tower_count * image_count )){
      if(cycles<1){
        console.log(Object.keys(images[1]))
        progress_div.style.backgroundColor = 'black';
        cycle();
      }
    }
  }
}
var new_nexrad_overlay = function(swlat,swlng,nelat,nelng,path,img,tower_id){
  if ( swlat == null ){
    return false;
  }
  var swBound = new google.maps.LatLng(swlat,swlng);
  var neBound = new google.maps.LatLng(nelat,nelng);
  var bounds = new google.maps.LatLngBounds(swBound, neBound);
  var overlay = new nexradOverlay(bounds,path,img,tower_id);
}
nexradOverlay.prototype.onAdd = function(){
  var div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.opacity = opacity;
  var img = document.createElement('img');
  img.src = this.path_ + this.image_;
  img.alt = this.image_;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.display = 'none';
  img.style.position = 'absolute';
  $(img).load(image_loader(img,div,this));
  $(img).data('time',this.time_);
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
