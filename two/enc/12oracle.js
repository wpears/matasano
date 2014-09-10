var ecb = require('./ecb');
var crypto = require('crypto');
var key = crypto.randomBytes(16);

module.exports = function(inp){
  inp = append(inp);
   
  return ecb(inp,key);
 };

function append(plaintext){
  if(!(plaintext instanceof Buffer)) plaintext = new Buffer(plaintext);
  var endStr = "Um9sbGluJyBpbiBteSA1LjAKV2l0aCBteSByYWctdG9wIGRvd24gc28gbXkg\naGFpciBjYW4gYmxvdwpUaGUgZ2lybGllcyBvbiBzdGFuZGJ5IHdhdmluZyBq\ndXN0IHRvIHNheSBoaQpEaWQgeW91IHN0b3A/IE5vLCBJIGp1c3QgZHJvdmUg\nYnkK";
  var end = new Buffer(endStr,'base64')
  return Buffer.concat([plaintext, end],plaintext.length+end.length)
} 
