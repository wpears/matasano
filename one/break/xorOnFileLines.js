var fs = require('fs');
var split = require('split');
var cipher = require('./singleByteXor');

module.exports = function (file,cb){
  var lineResults = [];
  fs.createReadStream(file)
    .pipe(split())
    .on('data',function(line){
      lineResults.push(cipher(line))
    })
    .on('end',function(){
      lineResults.sort(function(a,b){return b.score-a.score});
      cb(lineResults[0]);
    })
    ;
}
