var repeating = require('../enc/repeatingKeyXor');
var vig = require('./vigenere');
var fs = require('fs');

fs.readFile('../data/q6.txt', function(err,data){
  
  function runRepeating(key){
    console.log(repeating(data,key).toString());
  }
  vig(runRepeating);
});
