var countBits = require('./countBits.js');

module.exports = function(s1, s2){
  if(s1.length !== s2.length) return Infinity;
  var b1 = new Buffer(s1);
  var b2 = new Buffer(s2);
  var distance = 0;
  for(var i=0; i < b1.length; i++){
    distance += countBits(b1[i]^b2[i]);
  }
  return distance;
}
