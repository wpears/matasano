var xor = require('./fixedXOR.js');
var scores = new Array(256);
var worthy = toObj('ETAOINSHRDLU'.split(''));


module.exports = function(str){
  var strArr = new Array(str.length/2 + 1);

  for(var i = 0; i < 256; i++){
    var hex = i.toString(16);
    if(hex.length === 1) hex += hex; 
    var res = xor(str,makeStr(hex,strArr)).toString();
    scores[i] = {str:res,score:score(res)};
  }

  scores.sort(function(a,b){return b.score-a.score});
  return scores[0] 
}

function score(str){
  var count = 0;
  str.split('').forEach(function(v){
    if(worthy[v] !== undefined){
      count += 20 -worthy[v]/2    
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

function makeStr(character, arr){
  return arr.join(character);
}
