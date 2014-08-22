var crypto = require('crypto');
var read64 = require('read64');

read64('../data/q7.txt',function(err,data){
  var decipher = crypto.createDecipheriv('aes-128-ecb',new Buffer('YELLOW SUBMARINE'), new Buffer(0));

  console.log(decipher.update(data,'','utf8') + decipher.final('utf8'));
});
