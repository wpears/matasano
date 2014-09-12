var key = new Buffer('18a75a36e7844f18d327919b3ac5561b','hex');

var ecb = require('../break/ecb');
var kv = require('./kv');

module.exports = function(encProfile){
  return kv(ecb(encProfile,key).toString())  
}
