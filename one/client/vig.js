var transpose = require('../break/transpose');
var single = require('../break/singleByteXor');

module.exports = function(buf, keySize){
    var singleDigitArr = transpose(buf, keySize);
    var cipher = new Buffer(keySize);
    singleDigitArr.forEach(function(v,i){
      cipher[i] = single(v).character;
    });
    return cipher;
};

