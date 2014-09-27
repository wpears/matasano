/*
 *decrypt the current block with the key under "ecb" (just a block)
 *get the plaintext my xoring with the last ciphertext or IV
 * */
var ecb = require('dec_ecb');
var xor = require('xor');

module.exports = function (enc, key, IV){
  if(!(enc instanceof Buffer)) enc = new Buffer(enc)
  if(!key) key = new Buffer('YELLOW SUBMARINE');
  if(!(key instanceof Buffer)) key = new Buffer(key)
  if(!IV) IV = 'IVIVIVIVIVIVIVIV'
  if(!(IV instanceof Buffer)) IV = new Buffer(IV);

  
  var plaintext = '';
  var last = IV;
  for(var i=0;i<enc.length;i+=16){
    var ciphertext = enc.slice(i,i+16);
    var dec = ecb(ciphertext,key)
    plaintext += xor(dec,last).toString();
    last = ciphertext;
  }
  return plaintext;

  
}

