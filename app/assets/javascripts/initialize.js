var map;
var pause;
var cycles;
var images;
var towers;
var timeout;
var tower_count;
var image_count;
var progress_div;
var manifest = [];
var loaded_images;
var queued_images;
var opacity = 0.6;
var increment = 500;

var initialize = function(){
  var width = document.documentElement.clientWidth;
  if ( width < 1000 ){
    var zoom = 5;
  } else {
    var zoom = 6;
  }
  var options = {
    center:{lat: 45.710,lng: -122.959},
    zoom:zoom,
    mapTypeId:google.maps.MapTypeId.TERRAIN
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),options);
  draw_progress();
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
  ajax('','GET','json','/towers',parse_towers,map);
}
var manifest_success = function(data,objects){
  manifest = data;
}
var parse_towers = function(data,map){
  tower_count = data.length;
  $.each(data,function(i,tower){
    images[tower['id']] = {};
    towers.push(tower['id']);
    gather_images(tower,map);
  });
}
var gather_images = function(tower){
  var ims = images:get_param('images');
  ajax(images:ims,'GET','json','/towers/'+tower['id'],images_success,tower);
}
var images_success = function(data,tower){
  image_count = data.length;
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
    if ( sw_lat ){
      queued_images.push(img);
      new_nexrad_overlay(sw_lat,sw_lng,ne_lat,ne_lng,path,img,tower['id']);
    }
  });
}
