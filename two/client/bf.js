var bitflip = require('../break/bitflip');
var xor = require('xor');

module.exports = function(){
  var userdata = "xxxxxxxxxxxx";

  var enc = bitflip.encrypt(userdata);

  var lastCiph = enc.slice(16,32);
  var currDec = xor(lastCiph,userdata);
  var fakeLast = xor(currDec,';admin=true;wwww');
  var newEnc = Buffer.concat([enc.slice(0,16),fakeLast,enc.slice(32)])

  return bitflip.decrypt(newEnc);
};
