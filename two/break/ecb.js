var crypto = require('crypto');

module.exports = function(block,key){
  if(!key) key = 'YELLOW SUBMARINE';
  var decipher = crypto.createDecipheriv('aes-128-ecb',
      new Buffer(key),
      new Buffer(0));
  if(block.length === 16){
      block = Buffer.concat([block,new Buffer('60fa36707e45f499dba0f25b922301a5','hex')],32);
  }     
  var data = decipher.update(block);
  var fin = decipher.final();

  return Buffer.concat([data,fin],data.length+fin.length); 
};
