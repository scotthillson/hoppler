var draw_progress = function(){
  var div = document.createElement('div');
  div.style.backgroundColor = 'blue';
  div.style.position = 'fixed';
  div.style.height = '8px';
  div.style.left = 0;
  div.style.top = 0;
  document.body.appendChild(div);
  progress_div = div;
  loading_progress(0);
}
var loading_progress = function(progress){
  progress+=1;
  if(progress>100){
    progress=0;
  }
  progress_div.style.width = progress+'%';
  if(cycles<1){
    console.log('hey');
    setTimeout(loading_progress(progress),10);
  }
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
