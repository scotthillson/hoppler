var opacity = 0.6;
var images = {};

var click_time = function(){
  if(pause==0){pause=1;}else{pause=0;}
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

var cycle = function(){
  setInterval(function(){
    $('#time-'+i).css('color','#FFF');
      if(i<1){i=8;}else{i=i-pause;}
      $('#time-'+i).css('color','#F90');
      if(j==5){$('.radar').delay(100).css('display','block');$('#loading').css('display','none');}
  },990);
}

var opacityUp = function(){
  if(opacity<1){opacity = (parseFloat(opacity)+.2).toFixed(1);}
  $('.nexrad-overlay').css('opacity',opacity);
}
var opacityDown = function(){
  if (opacity>0){opacity = parseFloat(opacity-.2).toFixed(1);}
  $('.nexrad-overlay').css('opacity',opacity);
}
