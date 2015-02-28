var ready = function(){
  initialize();
  cycle();
  $('.opacity-up').on('click',opacityUp);
  $('.opacity-down').on('click',opacityDown);
  $('#avalanche').on('click',avalanche);
  $('#temperature').on('click',temperature);
  $('#map_canvas').on('click',function(){$('iframe').hide();});
}
$(document).on('click','.time-line',click_time);
$(document).ready(ready);
