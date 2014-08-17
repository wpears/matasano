module.exports = function(str, size, count){
  var arr = [];
  var index=0;
  for(var i=0; i < count; i++){
    arr.push(str.slice(index,index+=size))
  }
  return arr;
};

