var stat = require('./stat_ctr');
var space = require('spaceNonText');
var xor = require('xor');

module.exports = function(file,cb){
  stat(file,getKey);

function getKey(obj){
  var keyFront = obj.keyFront;
  var ciphers = obj.ciphers;
  cb(keyFront);
 /* ciphers.forEach(function(v,i){
    console.log(i,space(xor(v,keyFront)).toString());
  });*/
}
}

