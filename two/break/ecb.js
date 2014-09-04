var crypto = require('crypto');

module.exports = function(block,key){
  if(!key) key = 'YELLOW SUBMARINE';
  if(!(key instanceof Buffer)) key = new Buffer(key);

  var decipher = crypto.createDecipheriv('aes-128-ecb',
      key,
      new Buffer(0));
  if(block.length === 16){
      block = Buffer.concat([block,new Buffer('60fa36707e45f499dba0f25b922301a5','hex')],32);
  }     
  var data = decipher.update(block);
  var fin = decipher.final();
  var len = data.length+fin.length;

  return Buffer.concat([data,fin], len); 
};
