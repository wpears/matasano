var read64 = require('./read64');
var transpose = require('../break/transpose');
var single = require('../break/singleByteXor');

module.exports = function(cb){

  read64('../data/q6.txt',function(err,data){
    if(err)throw err;
    var keySize = 29;
    var singleDigitArr = transpose(data, keySize);
    var cipher = new Buffer(keySize);
    singleDigitArr.forEach(function(v,i){
      cipher[i] = single(v).character;
    });
    console.log("KEY: %s\n",cipher.toString());
    cb(cipher);
  });
}
