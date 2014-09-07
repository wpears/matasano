var oracle = require('../enc/12oracle');
var detect = require('../enc/discernMethod');

module.exports = function(str){
  var size = getSize();
  console.log('Size: ',size);
  
  detect(oracle);
  
};

function getSize(){
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
