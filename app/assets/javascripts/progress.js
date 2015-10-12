var draw_progress = function(){
  var div = document.createElement('div');
  div.style.backgroundColor = 'gray';
  div.style.position = 'fixed';
  div.style.height = '8px';
  div.style.width = '100%';
  div.style.left = 0;
  div.style.top = 0;
  document.body.appendChild(div);
  progress_div = div;
}
var draw_times = function(){
  var div = document.createElement('div');
  div.style.fontSize = '22px';
  div.style.textShadow='-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff';
  div.style.position = 'fixed';
  div.style.right = '20px';
  div.style.minWidth = '130px';
  div.style.top = '14px';
  document.body.appendChild(div);
  time_div = div;
}
var load_progress = function(){
  var element = document.getElementById('load-progress');
  progress_circle = new ProgressBar.Circle(element,{
      color:'#089adb',
      strokeWidth:4,
      fill:'none'
  });
}
