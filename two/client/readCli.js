var readBlocks = require('./readBlocks');
var fs = require('fs');

fs.createReadStream('./readBlocks.js').pipe(new readBlocks()).on('data',function(data){
  console.log(data.length,data.toString())
});
