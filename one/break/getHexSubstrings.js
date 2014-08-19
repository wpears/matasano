module.exports = function(buf, size, count){
  var arr = [];
  var index=0;
  for(var i=0; i < count; i++){
    arr.push(buf.slice(index,index+=size))
  }
  return arr;
};

