var key = new Buffer('18a75a36e7844f18d327919b3ac5561b','hex');

var ecb = require('../break/ecb');

module.exports = function(encProfile){
  return ecb(encProfile,key).toString() 
}
