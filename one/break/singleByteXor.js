var xor = require('xor');
var worthy = toObj('ETAOINSHRDLUetaoinshrdlu'.split(''));
var okay = toObj('BCFGMPWbcfgmpw'.split(''));

var tris = {'THE':1,'ING':1,'AND':1,'HER':1,'ERE':1,'ENT':1,'THA':1,'NTH':1,'WAS':1,'ETH':1,'FOR':1,'DTH':1,'THD':1};
var dis = {'HE':1,'IN':1,'ER':1,'AN':1,'RE':1,'ED':1,'ON':1,'ES':1,'ST':1,'EN':1,'AT':1,'TO':1,'NT':1,'HA':1,'ND':1,'OU':1,'EA':1,'NG':1};

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


function score(buf){
  var str = buf.toString();
  var count = 0;
  str.split('').forEach(function(v){
    if(worthy[v] !== undefined){
      count += 2;
    }else if(okay[v] !== undefined){
      count+=1;
    }else{
      count-=1;
    }
  });

  if(count > 5){ 
    splitByN(str,2).forEach(function(v){
      if(dis[v.toUpperCase()] !== undefined){
        count += 5;
      }
    });

    splitByN(str,3).forEach(function(v){
      if(tris[v.toUpperCase()] !== undefined){
        count += 10;
      }
    });
  }

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


function splitByN(str,n){
  var arr = [];
  var obj= {};
  for(var j=0;j<n;j++){
    for(var i=j;i<str.length;){
      var piece = str.slice(i,i+=n);
      if(piece.length === n) arr.push(piece);
    }
  }
  arr.forEach(function(v){
    obj[v] = 1;
  })
  return Object.keys(obj);
}
