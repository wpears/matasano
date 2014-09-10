var oracle = require('../enc/12oracle');
var detect = require('../enc/discernMethod');

module.exports = function(str){
  var size = getSize();
  console.log('Size: ',size);
  
  if(detect(oracle)){ //ecb
    return getSecret(size);
  }
  
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

function getSecret(size){
  var len = size - 1;
  var known = '';
  while(len >= 0){
    known+=getByte(len,known);
    len--;
  }
  console.log(known);
}

function getByte(len,known){
  var str = new Array(len +  1).join('!');
  var buf = new Buffer(str+known+"X");
  var obj = {};
  for(var i = 0; i < 256; i++){
    buf[buf.length-1] = i;
    obj[oracle(buf).slice(0,16).toString()] = i;
  }

  var thisByte = obj[oracle(new Buffer(str)).slice(0,16).toString()];
  var byteBuf = new Buffer(1);
  byteBuf[0] = thisByte;
  return byteBuf.toString();
}


