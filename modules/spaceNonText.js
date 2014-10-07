module.exports = function(buf){
  for(var i = 0; i < buf.length; i++){
    var currByte = buf[i];
    if( currByte <  32 || currByte > 127) buf[i] = 32;
  }
  return buf;
};
