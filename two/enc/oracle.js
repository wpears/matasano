var ecb = require('./ecb');
var cbc = require('./cbc');
var crypto = require('crypto');

module.exports = function(inp){
  var method = crypto.randomBytes(1)[0]%2 === 1
             ? ecb
             : cbc
             ;
  //append
  return method(inp)
 };
/*
 * TODO
 * Random IVs for cbc
 * make ecb and cbc have the same signature
 *
 * */
