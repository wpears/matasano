var applyInBlocks = require('applyInBlocks');
var blockecb = require('blockecb');

module.exports = function(data, key){
  if(!(data instanceof Buffer)) data = new Buffer(data);
  if(!(key instanceof Buffer)) key = new Buffer(key);

  function appFn(block){
    return blockecb(block,key);
  }

  return Buffer.concat(applyInBlocks(data,16,appFn));
}
