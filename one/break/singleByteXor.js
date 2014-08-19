var xor = require('../enc/fixedXOR.js');
var worthy = toObj('ETAOINSHRDLUetaoinshrdlu'.split(''));
var okay = toObj('BCFGMPWbcfgmpw'.split(''));
//str can be a hex string or buffer
module.exports = function(str){
  var buf;
  var scores = new Array(256);
  if(str instanceof Buffer) buf = str;
  else buf = new Buffer(str);

  for(var i = 1; i < 256; i++){
    var res = xor(buf,makeBuffer(i,buf.length)).toString();
    scores[i] = {str:res,score:score(res),character:i};
  }

  scores.sort(function(a,b){return b.score-a.score});
  return scores[0]; 
}

function score(str){
  var count = 0;
  str.split('').forEach(function(v){
    if(worthy[v] !== undefined){
      count += 2;
    }else if(okay[v] !== undefined){
      count+=1;
    }
  })
  return count;
}

function toObj(arr){
  var obj = {};
  arr.forEach(function(v,i){
     obj[v] = i;
  })
 return obj;
}

function makeBuffer(value,len){
  var b = new Buffer(len);
  for(var i=0;i<len;i++){
    b[i] = value;  
  }
  return b;
}
