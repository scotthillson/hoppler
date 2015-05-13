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
}
var showhide = function(tower,progress,one,two,t){
  var timer = setTimeout(
    (function(tower,progress,one,two){
      return function(){
        if(one){
          $(one).hide();
        }
        if(two){
          $(two).show();
        }
        if(tower==1){
          progress_div.style.width = progress+'%';
          var string = $(two).data('time');
          $(time_div).html(string.substring(11,16));
        }
      }
  })(tower,progress,one,two),t);
}
var manifest_timer = function(){}
var each_tower = function(tower){
  var imgs = images[tower];
  var keys = Object.keys(imgs).length;
  var one;
  var two;
  var t = 0;
  var i = 1;
  var progress;
  for ( var k in imgs ){
    two = imgs[k];
    t += increment;
    progress = (i/keys)*100;
    showhide(tower,progress,one,two,t);
    one = two;
    i += 1;
  }
  showhide(0,100,one,null,t+increment);
  return t;
}
var cycle = function(){
  cycles += 1;
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
    if(false){
      // use this block to refresh the imagery after several minutes
      setTimeout(setup,wait);
    } else{
      setTimeout(cycle,wait);
    }
  }
}
var opacity_up = function(){
  if(opacity<1){
    opacity = (parseFloat(opacity)+.2).toFixed(1);
  }
  $('.nexrad-overlay').css('opacity',opacity);
}
var opacity_down = function(){
  if (opacity>0){
    opacity = parseFloat(opacity-.2).toFixed(1);
  }
  $('.nexrad-overlay').css('opacity',opacity);
}
