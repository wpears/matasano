var crypto = require('crypto');

module.exports = function(block,key){
  if(!(block instanceof Buffer)) block = new Buffer(block)
  if(!key) key = new Buffer('YELLOW SUBMARINE');
  if(!(key instanceof Buffer)) key = new Buffer(key)

  var cipher = crypto.createCipheriv('aes-128-ecb',
      key,
      new Buffer(0));
   
  var data = cipher.update(block);
  var fin = cipher.final();
  var len = data.length+fin.length;

  return Buffer.concat([data,fin],len).slice(0,16);
  
};
