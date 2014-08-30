var readBlocks = require('./readBlocks');
var fs = require('fs');
var ecb = require('../break/ecb');
var xor = require('../../one/enc/fixedXOR');

var lastCipher = new Buffer(new Array(15).join('\x00'));

fs.createReadStream('../data/q10.txt').pipe(new readBlocks(16,'base64')).on('data',function(data){
  var last = lastCipher;
  lastCipher = data;

  var decrypted = ecb(data);
  var plaintext = xor(last,decrypted);
  console.log(plaintext.toString()); 
});
