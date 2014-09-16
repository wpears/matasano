module.exports = function (oracle){
  var started = 0;
  var bytes = 'A';
  var nibble = 'A';
  var count = 0;
  var lastLen = 0;
  
  while(1){ 
    var output = oracle(bytes); 
    if(lastLen){
      if(output.length === lastLen){
        if(started) count++;
      }else{
       if(started)return ++count;
       else started = 1; 
      }
    }
    lastLen = output.length;
    bytes +=nibble;
  }  
}