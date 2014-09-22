var bitflip = require('../break/bitflip');

module.exports= function(text){
  var enc = bitflip.encrypt(text);
  return bitflip.decrypt(enc);
}

