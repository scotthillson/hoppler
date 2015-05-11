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
  div.style.border = '1px solid black';
  div.style.backgroundColor = 'white';
  div.style.textAlign = 'center';
  div.style.fontSize = '13px'
  div.style.position = 'fixed';
  div.style.height = '14px';
  div.style.right = '100px';
  div.style.width = '50px';
  div.style.top = '14px';
  document.body.appendChild(div);
  time_div = div;
}
