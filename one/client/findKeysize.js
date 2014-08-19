var findKey = require('../break/findKeysize');
var hamming = require('../break/hamming');
var fs = require('fs');

fs.readFile('../data/q6.txt',function(err,data){
  console.log(findKey(data,hamming,{start:3,comparisons:8}));
});
