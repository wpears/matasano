var fs = require('fs');
var transpose = require('../break/transpose');
var single = require('../break/singleByteXor');

fs.readFile('../data/q6.txt',function(err,data){
  if(err)throw err;
  var singleDigitArr = transpose(data, 10);
  var cipher = [];
  singleDigitArr.forEach(function(v){
    cipher.push(single(v).character);
  });
  console.log(cipher.join(''));
});
