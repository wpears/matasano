var crypto = require('crypto');
var enc_blockecb = require('blockecb');

module.exports = function(block,key){
  if(!key) key = 'YELLOW SUBMARINE';
  if(!(key instanceof Buffer)) key = new Buffer(key);

  var decipher = crypto.createDecipheriv('aes-128-ecb',
      key,
      new Buffer(0));
  if(block.length % 16===0){
      var empty = new Buffer(16);
      for(var i=0;i<empty.length;i++)empty[i] = 16;
      block = Buffer.concat([block,enc_blockecb(empty,key)]);
  }     
  var data = decipher.update(block);
  var fin = decipher.final();
  var len = data.length+fin.length;

  return Buffer.concat([data,fin], len); 
};
