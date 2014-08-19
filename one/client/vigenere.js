var fs = require('fs');
var transpose = require('../break/transpose');
var single = require('../break/singleByteXor');

module.exports = function(cb){

  fs.readFile('../data/q6.txt',function(err,data){
    if(err)throw err;
    var keySize = 20;
    var singleDigitArr = transpose(data, keySize);
    var cipher = new Buffer(keySize);
    singleDigitArr.forEach(function(v,i){
      console.log(single(v),'\n');
      cipher[i] = single(v).character;
    });
    console.log(cipher);
    cb(cipher);
  });
}
