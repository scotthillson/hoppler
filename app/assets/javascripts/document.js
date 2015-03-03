var ready = function(){
  //cycle();
  initialize();
  $('#avalanche').on('click',avalanche);
  $('.time-line').on('click',click_time)l
  $('.opacity-up').on('click',opacityUp);
  $('#temperature').on('click',temperature);
  $('.opacity-down').on('click',opacityDown);
  $('#map_canvas').on('click',function(){$('iframe').hide();});
}
$(document).on('page:load',ready);
$(document).ready(ready);
