var findKey = require('../break/findKeysize');
var hamming = require('../break/hamming');
var read64 = require('./read64');

read64('../data/q6.txt',function(err,data){
  console.log(findKey(data,hamming,{start:3,comparisons:8}));
});
