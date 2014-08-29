module.exports = function(block, len){
  
  var buf = new Buffer(len);
  var pad = len - block.length;

  for(var i=0; i < block.length; i++){
    buf[i] = block[i]; 
  }
  
  for(; i < len; i++){
   buf[i] = pad; 
  }

  return buf;
}
