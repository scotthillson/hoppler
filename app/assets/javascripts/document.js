var get_param = function(variable){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){
      return pair[1];
    }
  }
}
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
