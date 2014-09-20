var apply = require('./applyInBlocks');
var bufEqual = require('bufEqual');

var buf = new Buffer("PEARSALLPEARSALLPEARSALLPEARSALLPEARSALLPEARSALLPEARSALLPEARSALL");




function checkForDup(enc){
  var lastBlock = new Buffer(0);
  var dup = 0;

  function applyFn(block){
    if (bufEqual(lastBlock,block)){ 
      dup++;
    }
    lastBlock = block;
  }
  apply(enc,16,applyFn);
  return dup;  
}

module.exports = function (oracle) {
  var badEnc = oracle(buf);
  var dup = checkForDup(badEnc);
  
  if(dup){
   console.log('ecb! %d duplicate blocks',dup);
   return 1;
  }
  console.log('cbc, no duplicate blocks');
  return 0;
};
