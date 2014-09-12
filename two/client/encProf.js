var key = new Buffer('18a75a36e7844f18d327919b3ac5561b','hex');
var ecb = require('../enc/ecb');

module.exports = function(profile){
  return ecb(profile,key);
}
