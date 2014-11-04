var stat = require('./stat_ctr');
var space = require('spaceNonText');
var xor = require('xor');

module.exports = function(file,cb){
  stat(file,getKey);

function getKey(obj){
  var keyFront = obj.keyFront;
  var ciphers = obj.ciphers;
  console.log(keyFront.length);
  keyFront[5]^=79^78;
  keyFront[22]^=78^82;
  keyFront[47]^=104^105;
  keyFront[48] = ciphers[15][48]^69;
  keyFront[49] = ciphers[15][49]^65;
  
  function fillIns (arr){
    var a = new Buffer(arr.length);
    arr.forEach(function(v,i){
      var terms = v.split(',')
      a[i] = ciphers[terms[0]][terms[1]]^terms[2]
    })
    keyFront = Buffer.concat([keyFront,a]);
  }

  var arr = [
    '5,53,69 ',
    '59,54,101',
    //scene of a crime
    '16,55,114',
    '16,56,105',
    '16,57,109',
    '16,58,101',
    
    //reincarnated
    '22,59,97',
    '22,60,114',
    '22,61,110',
    '22,62,97',
    '22,63,116',
    '22,64,101',
    '22,65,100',
    
    //resusitation
    '34,66,105',
    '34,67,116',
    '34,68,97',
    '34,69,116',
    '34,70,105',
    '34,71,111',
    '34,72,110'
  ]

  fillIns(arr);
   
  ciphers.forEach(function(v,i){
    console.log(i,space(xor(v,keyFront)).toString());
  });
  
  cb(keyFront);
}
}

