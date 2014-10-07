module.exports = function(buf){
  var justText = new Buffer(buf.length);
  var curr = 0;

  for(var i = 0; i < buf.length; i++){
    var currByte = buf[i];
    if( currByte > 31 && currByte < 128) justText[curr++] = currByte;
  }
  
  return justText.slice(0,curr);
};
