let map;
let pause;
let cycles;
let images;
let towers;
let time_div;
let tower_count;
let image_count;
let expected_images;
let progress_circle;
let progress_div;
let loading_div;
let loaded_images;
let queued_images;
const opacity = 0.6;
let increment = 400;

const initialize = function () {
  draw_progress();
  if (get_param('increment')) {
    if (get_param('increment') > 0) {
      increment = Number(get_param('increment'));
    }
  }
  let location_name = location.pathname.split('/')[location.pathname.split('/').length - 1];
  if (location_name == '') {
    location_name = 'Oregon';
  }
  ajax({ id: location_name }, 'GET', 'json', '/location_point', draw_map, '');
};

var draw_map = function (data, objects) {
  const width = document.documentElement.clientWidth;
  const zoom = 7;
  const options = {
    center: { lat: Number(data.lat), lng: Number(data.lng) },
    zoom,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), options);
  setup();
};

var setup = function () {
  loaded_images = [];
  queued_images = [];
  towers = [];
  images = {};
  cycles = 0;
  get_towers();
};

var get_towers = function () {
  let location_name = location.pathname.split('/')[location.pathname.split('/').length - 1];
  if (location_name == '') {
    location_name = 'Oregon';
  }
  ajax('', 'GET', 'json', `/locations/${location_name}`, parse_towers, '');
};

var parse_towers = function (data, objects) {
  progress_circle.animate(0.1, null);
  tower_count = data.length;
  $.each(data, (i, tower) => {
    towers.push(tower.id);
    images[tower.id] = {};
    setTimeout(function(){
      gather_images(tower)
    }, (i*100));
  });
};

var gather_images = function (tower) {
  console.log(tower.id);
  const images = get_param('images');
  ajax({ images }, 'GET', 'json', `/towers/${tower.id}`, images_success, tower);
};

var images_success = function (data, tower) {
  image_count = data.length;
  expected_images = tower_count * image_count;
  let sw_lat = Number(tower.sw_lat);
  if (sw_lat == 0) {
    sw_lat = Number(tower.est_sw_lat);
  }
  let sw_lng = Number(tower.sw_lng);
  if (sw_lng == 0) {
    sw_lng = Number(tower.est_sw_lng);
  }
  let ne_lat = Number(tower.ne_lat);
  if (ne_lat == 0) {
    ne_lat = Number(tower.est_ne_lat);
  }
  let ne_lng = Number(tower.ne_lng);
  if (ne_lng == 0) {
    ne_lng = Number(tower.est_ne_lng);
  }
  const path = 'https://s3-us-west-2.amazonaws.com/hoppler/';
  $.each(data, (i, img) => {
    queued_images.push(img);
    new_nexrad_overlay(sw_lat, sw_lng, ne_lat, ne_lng, path, img, tower.id);
  });
};
