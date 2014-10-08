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
  
  var a = new Buffer(2); 
  a[0] = ciphers[5][53]^69; 
  a[1] = ciphers[13][54]^78;
  //a[2] = ciphers[30][55]^78;
  //a[3] = ciphers[30][56]^67;
   
  keyFront = Buffer.concat([keyFront,a]);
  ciphers.forEach(function(v,i){
    console.log(i,space(xor(v,keyFront)).toString());
  });
  
  cb(keyFront);
}
}

