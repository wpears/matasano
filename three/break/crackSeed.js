var getRandom = require('../server/getRandom.js');
var twister = require('../enc/twister.js');

module.exports = function(){
  var currSeed = Date.now();
  getRandom(breakSeed);

  function breakSeed(rand){
    while(1){
      twister.init(currSeed);
      if(twister.rand() === rand){
        return console.log("Seed broken! It's %d", currSeed);
      }
      currSeed++;
    } 
  }
}
