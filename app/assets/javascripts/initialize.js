var map;
var pause;
var cycles;
var images;
var towers;
var time_div;
var tower_count;
var image_count;
var expected_images;
var progress_circle;
var progress_div;
var loading_div;
var manifest = [];
var loaded_images;
var queued_images;
var opacity = 0.6;
var increment = 400;
var initialize = function(){
  draw_progress();
  if(get_param('increment')){
    if(get_param('increment')>0){
      increment = Number(get_param('increment'));
    }
  }
  var location_name = location.pathname.split('/')[location.pathname.split('/').length-1];
  if(location_name==""){
    location_name = 'Oregon';
  }
  ajax({id:location_name},'GET','json','/location_point',draw_map,'');
}
var draw_map = function(data,objects){
  var width = document.documentElement.clientWidth;
  if ( width < 1000 ){
    var zoom = 5;
  } else {
    var zoom = 6;
  }
  var options = {
    center:{lat: Number(data.lat),lng: Number(data.lng)},
    zoom:zoom,
    mapTypeId:google.maps.MapTypeId.TERRAIN
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),options);
  setup();
}
var setup = function(){
  loaded_images = [];
  queued_images = [];
  towers = [];
  images = {};
  cycles = 0;
  get_towers();
}
var get_towers = function(){
  var location_name = location.pathname.split('/')[location.pathname.split('/').length-1];
  if(location_name==""){
    location_name = 'Oregon';
  }
  ajax('','GET','json','/locations/'+location_name,parse_towers,'');
}
var manifest_success = function(data,objects){
  manifest = data;
}
var parse_towers = function(data,objects){
  progress_circle.animate(.1,null);
  tower_count = data.length;
  $.each(data,function(i,tower){
    towers.push(tower['id']);
    images[tower['id']] = {};
    gather_images(tower);
  });
}
var gather_images = function(tower){
  var images = get_param('images');
  ajax({images:images},'GET','json','/towers/'+tower['id'],images_success,tower);
}
var images_success = function(data,tower){
  image_count = data.length;
  expected_images = tower_count * image_count;
  var sw_lat = Number(tower['sw_lat']);
  if(sw_lat==0){sw_lat = Number(tower['est_sw_lat']);}
  var sw_lng = Number(tower['sw_lng']);
  if(sw_lng==0){sw_lng = Number(tower['est_sw_lng']);}
  var ne_lat = Number(tower['ne_lat']);
  if(ne_lat==0){ne_lat = Number(tower['est_ne_lat']);}
  var ne_lng = Number(tower['ne_lng']);
  if(ne_lng==0){ne_lng = Number(tower['est_ne_lng']);}
  var path = 'https://s3-us-west-2.amazonaws.com/hoppler/';
  $.each(data,function(i,img){
    queued_images.push(img);
    new_nexrad_overlay(sw_lat,sw_lng,ne_lat,ne_lng,path,img,tower['id']);
  });
}
