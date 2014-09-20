var oracle = require('../enc/14oracle');
var detect = require('../enc/discernMethod');
var bufEqual = require('bufEqual');

var prePost = "PEARSALLPEARSALLPEARSALLPEARSALL"
module.exports = function(){
  if(detect(oracle)){ //ecb
    var size = 16; 
    return getSecret(size);
  }
};

function getSecret(size){
  var len = size - 1;
  var known = '';

  var totalLen=Infinity;
  for(var i=0;i<256;i++){
    var oLen = oracle(new Buffer(0)).length;
    if(oLen < totalLen) totalLen = oLen;
  }
  console.log(totalLen);

  while(len >= 0){
    known+=getFirstBytes(len,known);
    len--;
    console.log(known);
  } 

  /*while (known.length < totalLen){
    len = size -1;
    while(len >= 0){
      known+=getBytes(len,known);
      len--;
    }
  }*/
  
  return known;
}


function getFirstBytes(len,known){ //str len decreases in loop as more bytes are
  var str = new Array(len +  1).join('!'); //exposed by the oracle
  var buf = new Buffer(prePost+str+known+"X");
  var obj = makeByteObj(buf);  
  
  return findByte(obj,str,known);
}


function getBytes(len,known){
  var str = new Array(len +  1).join('!');
  var buf = new Buffer(prePost+known.slice(-15)+"X");
  var obj = makeByteObj(buf); 
   
  return findByte(obj,str,known); 
}


function makeByteObj(buf){
  var obj = {};
  for(var i = 0; i < 256; i++){
    buf[buf.length-1] = i;
    var result = oracle(buf);
    if(bufEqual(result.slice(0,16),result.slice(16,32))){
      obj[result.slice(32,48).toString()] = i;
    }else{
      i--;
    }
  }
  return obj;
}


function findByte(obj,str,known){
  var low = ((known.length/16) >> 0) * 16 + 32;
  var buf = new Buffer(prePost+str);
  var result = oracle(buf);
  while(!bufEqual(result.slice(0,16),result.slice(16,32))){
    result = oracle(buf);
  }
  var thisByte = obj[result.slice(low,low+16).toString()];
  var byteBuf = new Buffer(1);
  byteBuf[0] = thisByte;
  return byteBuf.toString();
}
