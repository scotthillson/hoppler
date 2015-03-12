var opacity = 0.6;

var time_click = function(){
  if(pause==0){
    pause=1;
  } else {
    pause=0;
  }
}

var times = function(){
  var date = new Date();
  console.log('times ' + date.toString('hhmmss'));
  var zone = date.getTimezoneOffset();
  zone = zone / 60 ;
  $('.time').empty();
  for(k=0;k<9;k++){
    if(images){
      line = images[k+36];
      hour = line.substr(0,2);
      hour = hour - zone ;
      var platform = navigator.platform;
      if (platform=='iPhone'||platform=='android'){$('.time').css({'top':'70px','left':'5px','font-size':'21px'});}
      $('.time').append('<div class="time-line" id="time-'+k+'">'+hour+':'+minute+'</div>');
    }
  }
}

var each_tower = function(tower){
  var imgs = images[tower];
  var one;
  var two;
  var t = 0;
  for ( var k in imgs ){
    two = imgs[k];
    t += 900
    setTimeout(
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
    one = two;
  }
}

var cycle = function(){
  for ( k in towers ){
    each_tower(towers[k]);
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
