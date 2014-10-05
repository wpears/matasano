var fs =require('fs');
var crypto = require('crypto');

fs.readFile('../data/q8.txt',function(err,data){
  var str = data.toString();
  var buf = new Buffer(str,'hex');
  
  var decipher = crypto.createDecipheriv('aes-128-ecb',new Buffer('YELLOW SUBMARINE'), new Buffer(0));

  for(var i=0;i<data.length;i+=16){
    decipher.update(data,'','utf8');
  }
  decipher.final()
})
