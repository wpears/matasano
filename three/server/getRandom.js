var twister = require('../enc/twister.js');

var nextCheck;
function getRandom(cb){
  var currTime = Date.now();
  var firstWait = Math.random()*20000>>0;
  var secondWait = Math.random()*20000>>0;
  var randStamp = currTime + firstWait;
  var retTime = randStamp + secondWait;
  
  twister.init(randStamp);
  var rand = twister.rand();
  
  nextCheck = checkTime.bind(null,retTime,rand,cb,randStamp);
  return nextCheck();
}
function checkTime(retTime,rand,cb,stamp){
    if(Date.now() < retTime){
      return setTimeout(nextCheck,1)
    }else{
      return cb(rand,stamp);
    }
  }
module.exports = getRandom;

  
