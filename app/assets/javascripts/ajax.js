var json_ajax = function(params,rest,type,url,callback,objects){
  $.ajax({
    type: rest,
    dataType: type,
    data: params,
    url: url,
    success: function(data){
      if ( data.error ){
        bad_notice(data.error);
      } else{
        callback(data,objects);
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      if ( errorThrown.length ){
        bad_notice(errorThrown);
        console.log(errorThrown);
      } else {
        bad_notice(textStatus);
        console.log(textStatus);
      }
    }
  });
}
