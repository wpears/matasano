var fs = require('fs');

module.exports = function(file,cb){
  file = file || '../data/q8.txt';
  fs.readFile(file,function(err,data){
    var str = data.toString();
    var arr = str.split('\n')

    var max = 0;
  var maxIndex;

  arr.forEach(function(v,i){
    var curr = getMatches(v);
    if(curr > max){
      max = curr;
      maxIndex = i;
    }
  });
  cb(maxIndex,arr[maxIndex]);
  })

  //the unoptimization, it burns.. sure do love repeated string slicing
  function getMatches(str){
    var matches = 0;
    for(var i=0; i < str.length; i+=32){
      var j = i+32;
      var curr = str.slice(i,j);
      for(; j < str.length; j+=32){
        if(curr === str.slice(j,j+32)) matches++; 
      }
    }
    return matches;
  }
}
