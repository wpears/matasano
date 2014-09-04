var ecb = require('./ecb');
var cbc = require('./cbc');
var crypto = require('crypto');

module.exports = function(inp){
  var method = crypto.randomBytes(1)[0]%2;
  var key = crypto.randomBytes(16);
  var iv = crypto.randomBytes(16);
  var output;

  inp = append(inp);
   
  if(method===1) output = ecb(inp,key);
  else output = cbc(inp,key,iv);

  return output;
 };

function append(plaintext){
  var beg = crypto.randomBytes(1)[0]%5+5;
  var end = crypto.randomBytes(1)[0]%5+5;

  var begBuf = crypto.randomBytes(beg);
  var endBuf = crypto.randomBytes(end);
  if(!(plaintext instanceof Buffer)) plaintext = new Buffer(plaintext);

  return Buffer.concat([begBuf, plaintext, endBuf],beg+end+plaintext.length)
} 

/*
 * TODO
 * Random IVs for cbc
 * make ecb and cbc have the same signature
 *
 * */
