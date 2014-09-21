module.exports = function(input,len){
  if(!len) len = 16; 
  var pad = len - input.length%len;
  if(!pad) pad = 16;
  var inpBuf = new Buffer(input);
  var buf = new Buffer(input.length+pad); 
   
  for(var i=0;i<inpBuf.length;i++){
    buf[i] = inpBuf[i];
  }

  for(var end=i+len; i < end; i++){
    buf[i]=pad; 
  }

  return buf;
}
