var oracle = require('../enc/14oracle');
var detect = require('../enc/discernMethod');
var bufEqual = require('bufEqual');

var prePost = "PEARSALLPEARSALLPEARSALLPEARSALL"
var targetBlock;

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
  var targetBlocks = [];
  for(var i=0;i<1024;i++){
    var oLen = oracle(new Buffer(0)).length;
    if(oLen < totalLen) totalLen = oLen;

    var result = oracle(new Buffer(prePost));
    var first = result.slice(0,16);
    var second = result.slice(16,32);
    if(bufEqual(first,second)){
      targetBlocks.push(first)
    }
  }
  
  targetBlocks.sort();
  targetBlock = targetBlocks[targetBlocks.length/2>>0];
  console.log(totalLen);

  var next;

  while(len >= 0){
    next = getFirstBytes(len,known);
    known+=next;
    len--;
    process.stdout.write(next);
  } 

  while (known.length < totalLen){
    len = size -1;
    while(len >= 0){
      next = getBytes(len,known);
      known+= next;
      len--;
      process.stdout.write(next);
    }
  }
  
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
    if(bufEqual(result.slice(0,16),targetBlock)){
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
  while(!bufEqual(result.slice(0,16),targetBlock)){
    result = oracle(buf);
  }
  var thisByte = obj[result.slice(low,low+16).toString()];
  var byteBuf = new Buffer(1);
  byteBuf[0] = thisByte;
  return byteBuf.toString();
}
