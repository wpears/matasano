var crypto = require('crypto');

module.exports = function(block){
  if(!(block instanceof Buffer)) block = new Buffer(block)
  var cipher = crypto.createCipheriv('aes-128-ecb',
      new Buffer('2b7e151628aed2a6abf7158809cf4f3c','hex'),
      new Buffer(0));
 console.log(block,block.length); 
  var data = cipher.update(block,'','hex');
  var fin = cipher.final('hex');
  console.log(data,data.length)
  console.log(fin,fin.length)
  return data + fin
};
