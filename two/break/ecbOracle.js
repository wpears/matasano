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
    known+=getFirstBytes(len,known);
    len--;
  }
  var totalLen = oracle(new Buffer(0)).length;
  while (known.length < totalLen){
    len = size -1;
    while(len >= 0){
      known+=getBytes(len,known);
      len--;
    }
  }
  return known;
}

function getFirstBytes(len,known){
  var str = new Array(len +  1).join('!');
  var buf = new Buffer(str+known+"X");
  var obj = makeByteObj(buf);  
  
  return findByte(obj,str,known);
}

function getBytes(len,known){
  var str = new Array(len +  1).join('!');
  var buf = new Buffer(known.slice(-15)+"X");
  var obj = makeByteObj(buf); 
   
  return findByte(obj,str,known); 
}

function makeByteObj(buf){
  var obj = {};
  for(var i = 0; i < 256; i++){
    buf[buf.length-1] = i;
    obj[oracle(buf).slice(0,16).toString()] = i;
  }
  return obj;
}

function findByte(obj,str,known){
  var low = ((known.length/16) >> 0) * 16;
  var thisByte = obj[oracle(new Buffer(str)).slice(low,low+16).toString()];
  var byteBuf = new Buffer(1);
  byteBuf[0] = thisByte;
  return byteBuf.toString();
}
//Rollin' in my 5.
//feed 15 -> 0 building object from known.slice(-15).. get the right block
//