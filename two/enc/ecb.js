var crypto = require('crypto');

module.exports = function(block,key){
  if(!(block instanceof Buffer)) block = new Buffer(block)
  if(!key) key = 'YELLOW SUBMARINE';

  var cipher = crypto.createCipheriv('aes-128-ecb',
      new Buffer(key),
      new Buffer(0));
   
  var data = cipher.update(block);
  var fin = cipher.final();

  return Buffer.concat([data,fin],data.length+fin.length);
};
