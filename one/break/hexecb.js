var fs = require('fs');

fs.readFile('../data/q8.txt',function(err,data){
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
  console.log(maxIndex,max,arr[maxIndex]);
  getMatchesHarness(arr[maxIndex])
})

//the unoptimization, it burns.. sure do love repeated string slicing
function getMatches(str){
  var matches = 0;
  for(var i=0; i < str.length; i+=8){
    var j = i+8;
    var curr = str.slice(i,j);
    for(; j < str.length; j+=8){
      if(curr === str.slice(j,j+8)) matches++; 
    }
  }
  return matches;
}

function getMatchesHarness(str){
  var matches = 0;
  for(var i=0; i < str.length; i+=8){
    var j = i+8;
    var curr = str.slice(i,j);
    console.log(curr);
    for(; j < str.length; j+=8){
      if(curr === str.slice(j,j+8)){
        console.log(i,j);
        matches++; 
      }
    }
  }
  return matches;
}
