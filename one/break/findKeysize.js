var getHexSubstrings = require('./getHexSubstrings');
var hamming = require('./hamming');

module.exports = function (str, scoringFn, params){
  var start = params&&params.start || 2;
  var end = params&&params.end || 40;
  var comparisons = params&&params.comparisons || 2;
  var min = Infinity;
  var keysize;

  for(var i=start; i <=end; i++){
    var strings = getHexSubstrings(str,i,comparisons*2);   
    var score = 0;
    for(var j = 0; j<strings.length; j+=2){
      score += scoringFn(strings[j],strings[j+1])
    }
    score/=comparisons;
    score/=i;
    if(score < min){
      min = score; 
      keysize = i;
    }
  }
  return keysize;
};
