var readBlocks = require('./readBlocks');
var fs = require('fs');
var ecb = require('../enc/ecb');
var xor = require('../../one/enc/fixedXOR');

var lastCipher = new Buffer(new Array(15).join('\x00'));

fs.createReadStream('../data/q10.txt').pipe(new readBlocks(16,'base64')).on('data',function(data){
  lastCipher = xor(lastCipher,data);
  console.log(lastCipher.toString()); 
});
