var ready = function(){
  initialize();
  $('#avalanche').on('click','avalanche');
  $('.time-line').on('click',time_click);
  $('.opacity-up').on('click',opacity_up);
  $('#temperature').on('click',temperature);
  $('.opacity-down').on('click',opacity_down);
  $('#map_canvas').on('click',function(){$('iframe').hide();});
}
$(document).on('page:load',ready);
$(document).ready(ready);
