var crypto = require('crypto');

module.exports = function(block,key){
  if(!key) key = 'YELLOW SUBMARINE';
  var decipher = crypto.createDecipheriv('aes-128-ecb',
      new Buffer(key),
      new Buffer(0));
      
  var data = decipher.update(block);
  var fin = decipher.final();

  return Buffer.concat([data,fin],data.length+fin.length); 
};
