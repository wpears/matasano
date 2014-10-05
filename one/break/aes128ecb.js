var crypto = require('crypto');

module.exports = function(data){
  var decipher = crypto.createDecipheriv('aes-128-ecb',new Buffer('YELLOW SUBMARINE'), new Buffer(0));
  return decipher.update(data,'','utf8') + decipher.final('utf8');
};
