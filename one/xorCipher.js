var xor = require('./fixedXOR.js');

var str = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736';
var strArr = new Array(str.length/2 + 1);
var shortStrArr = new Array(str.length +1);

var scores = new Array(256);
var worthy = toObj('ETAOINSHRDLU'.split(''));


for(var i = 0; i < 256; i++){  
  var res = xor(str,makeStr(i.toString(16))).toString();
  scores[i] = {str:res,score:score(res)};
}

scores.sort(function(a,b){return b.score-a.score});
console.log(scores[0]);

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

function makeStr(character){
  if(character.length === 2)
    return strArr.join(character);
  return shortStrArr.join(character);
}
