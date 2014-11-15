var getRandom = require('../server/getRandom.js');
var twister = require('../enc/twister.js');

module.exports = function(cb){
  var currSeed = Date.now();
  getRandom(breakSeed);

  function breakSeed(rand,seed){
    while(1){
      twister.init(currSeed);
      if(twister.rand() === rand){
        return cb(seed,currSeed); 
      }
      currSeed++;
    } 
  }
}
