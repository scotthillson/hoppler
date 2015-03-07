var gather_images = function(tower){
  ajax('','GET','json','/towers/'+tower['id'],images_success,tower);
}

var images_success = function(data,tower){
  var sw_lat = Number(tower['sw_lat']);
  var sw_lng = Number(tower['sw_lng']);
  var ne_lat = Number(tower['ne_lat']);
  var ne_lng = Number(tower['ne_lng']);
  console.log(sw_lat);
  var path = 'https://s3-us-west-2.amazonaws.com/hoppler/';
  $.each(data,function(i,img){
    if ( sw_lat ){
      new_nexrad_overlay(sw_lat,sw_lng,ne_lat,ne_lng,path+img['image']);
    }
  });
}
