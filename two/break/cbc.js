var ecb = require('./ecb');
var xor = require('../../one/enc/fixedXOR');

module.exports = function(data, key, IV){
  if(!(data instanceof Buffer)) data = new Buffer(data);
  if(!(key instanceof Buffer)) key = new Buffer(key);
  if(!(IV instanceof Buffer)) IV = new Buffer(IV);
  
  var decrypted = ecb(data, key);
  return xor(decrypted, IV);
};
