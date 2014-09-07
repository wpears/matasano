var blockcbc = require('./blockcbc');
var applyInBlocks = require('./applyInBlocks');

module.exports = function(data, key, IV){
  if(!(data instanceof Buffer)) data = new Buffer(data);
  if(!(key instanceof Buffer)) key = new Buffer(key);
  if(!(IV instanceof Buffer)) IV = new Buffer(IV);
  
  var ciphertexts = [];
  var len = IV.length;
  
  function applyFn(block){
    return IV = blockcbc(block,key, IV);
  }
  
  return Buffer.concat(applyInBlocks(data,len,applyFn)); 
};
