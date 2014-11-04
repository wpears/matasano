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
  
  var a = new Buffer(20); 
  a[0] = ciphers[5][53]^69; 
  a[1] = ciphers[59][54]^101;
  //scene of a crime
  a[2] = ciphers[16][55]^114
  a[3] = ciphers[16][56]^105
  a[4] = ciphers[16][57]^109
  a[5] = ciphers[16][58]^101

 //reincarnated  
  a[6] = ciphers[22][59]^97
  a[7] = ciphers[22][60]^114
  a[8] = ciphers[22][61]^110
  a[9] = ciphers[22][62]^97
  a[10] = ciphers[22][63]^116
  a[11] = ciphers[22][64]^101
  a[12] = ciphers[22][65]^100

  //resusitation  
  a[13] = ciphers[34][66]^105;
  a[14] = ciphers[34][67]^116;
  a[15] = ciphers[34][68]^97;
  a[16] = ciphers[34][69]^116;
  a[17] = ciphers[34][70]^105;
  a[18] = ciphers[34][71]^111;
  a[19] = ciphers[34][72]^110;
   
  keyFront = Buffer.concat([keyFront,a]);
  ciphers.forEach(function(v,i){
    console.log(i,space(xor(v,keyFront)).toString());
  });
  
  cb(keyFront);
}
}

