module.exports = function(str, size, count){
  var arr = [];
  var index=0;
  var byteSize = size*2; //2 str chars per byte in hex
  for(var i=0; i < count; i++){
    arr.push(str.slice(index,index+=byteSize))
  }
  return arr;
};

