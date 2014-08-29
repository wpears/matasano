var crypto = require('crypto');

module.exports = function(block){
  var decipher = crypto.createDecipheriv('aes-128-ecb',
      new Buffer('YELLOW SUBMARINE'),
      new Buffer(0));

  return decipher.update(block,'','utf8') + decipher.final('utf8');
};
