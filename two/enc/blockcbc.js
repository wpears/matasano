var fs = require('fs');
var ecb = require('./blockecb');
var xor = require('../../one/enc/fixedXOR');

module.exports = function(data, key, IV){
  if(!(data instanceof Buffer)) data = new Buffer(data);
  if(!key) key = "YELLOW SUBMARINE";
  if(!IV) IV = 'IVIVIVIVIVIVIVIV'
  if(!(key instanceof Buffer)) key = new Buffer(key);
  if(!(IV instanceof Buffer)) IV = new Buffer(IV);

  var xored = xor(IV, data);
  return ecb(xored, key);
};

