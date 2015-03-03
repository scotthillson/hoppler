var gather_images = function(){
  ajax('','GET','json','/images',images_success);
}
var images_success = function(data,objects){
  var image;
  $.each(data,function(img){
    image = $('<img src="'+img+'" />');
  });
}
