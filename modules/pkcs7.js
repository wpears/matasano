function pad(input,len){
  if(!len) len = 16; 
  var padLen = len - input.length%len;
  if(!padLen) padLen = 16;
  var inpBuf = new Buffer(input);
  var buf = new Buffer(input.length+padLen); 
   
  for(var i=0;i<inpBuf.length;i++){
    buf[i] = inpBuf[i];
  }

  for(var end=i+len; i < end; i++){
    buf[i]=padLen; 
  }

  return buf;
}

function check (block, blockLength){
  if(!blockLength) blockLength = 16;
  if(!block||block.length%blockLength !== 0) throw new Error("Invalid block.");
  if(!(block instanceof Buffer)) block = new Buffer(block);

  var len = block.length -1;
  var last = block[len];
  var count = 1;

  if (last === 0 || last > 16) return false;//paddingException();
  if (last === 1) return true/*unpad(block,len)*/;

  while (block[--len] === last){
    if(++count >= last) return true/*unpad(block,len)*/; 
  }
  return false;//paddingException();
}

function paddingException(){
  throw new Error("Invalid padding. Please don't attack me with this clear padding oracle.")
}

function unpad(block,len){
  return block.slice(0,len).toString();
}

module.exports = {
  pad:pad,
  check:check
};
