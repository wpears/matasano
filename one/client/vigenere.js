var read64 = require('./read64');
var transpose = require('../break/transpose');
var single = require('../break/singleByteXor');

module.exports = function(cb,file){
  file =  file || '../data/q6.txt';
  read64(file, function(err,data){
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
