var repeating = require('../enc/repeatingKeyXor');
var vig = require('./vigenere');
var read64 = require('./read64');

read64('../data/q6.txt', function(err,data){
  
  function runRepeating(key){
    console.log(repeating(data,key).toString());
  }
  vig(runRepeating);
});
