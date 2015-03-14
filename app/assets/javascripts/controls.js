var timeout;
var opacity = 0.6;
var increment = 500;
var time_click = function(){
  if(pause==0){
    pause=1;
  } else {
    pause=0;
  }
}
var times = function(){
  $('.time').empty();
  var platform = navigator.platform;
  if (platform=='iPhone'||platform=='android'){
    $('.time').css({'top':'70px','left':'5px','font-size':'21px'});
  }
  for(var k in manifest){
    console.log(k);
    //$('.time').append('<div class="time-line" id="time-'+k+'">'+time+'</div>');
  }
}
var showhide = function(one,two,t){
  timeout = setTimeout(
    (function(one,two){
      return function(){
        if(one){
          $(one).hide();
        }
        if(two){
          $(two).show();
        }
      }
  })(one,two),t);
}
var manifest_timer = function(){
  for ( k in manifest ){
    //if(manifest[two.alt]){
      //console.log(manifest[two.alt]);
    //}
  }
}
var each_tower = function(tower){
  var imgs = images[tower];
  var one;
  var two;
  var t = 0;
  for ( var k in imgs ){
    two = imgs[k];
    t += increment;
    showhide(one,two,t);
    one = two;
  }
  showhide(one,null,t+increment);
  return t;
}
var cycle = function(){
  var wait = 0;
  if(manifest.length){
    manifest_timer();
  } else { //go into limp mode
    for ( k in towers ){
      w = each_tower(towers[k]);
      if(w > wait){
        wait = w;
      }
    }
  }
  if(wait>0){
    setTimeout(cycle,wait);
  }
}
var opacity_up = function(){
  if(opacity<1){opacity = (parseFloat(opacity)+.2).toFixed(1);}
  $('.nexrad-overlay').css('opacity',opacity);
}
var opacity_down = function(){
  if (opacity>0){opacity = parseFloat(opacity-.2).toFixed(1);}
  $('.nexrad-overlay').css('opacity',opacity);
}
