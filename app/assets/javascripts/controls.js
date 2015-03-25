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
  }
}
var showhide = function(keys,one,two,i,t){
  timeout = setTimeout(
    (function(keys,one,two,i){
      return function(){
        if(one){
          $(one).hide();
        }
        if(two){
          $(two).show();
        }
        progress_div.style.width = (i/keys)*100 + '%';
      }
  })(keys,one,two,i),t);
}
var manifest_timer = function(){
  //for ( k in manifest ){}
}
var each_tower = function(tower){
  var imgs = images[tower];
  var keys = Object.keys(imgs).length;
  var one;
  var two;
  var t = 0;
  var i = 1;
  for ( var k in imgs ){
    two = imgs[k];
    t += increment;
    i += 1;
    showhide(keys,one,two,i,t);
    one = two;
  }
  showhide(keys,one,null,i,t+increment);
  return t;
}
var cycle = function(){
  progress_div.style.width = '0%';
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
