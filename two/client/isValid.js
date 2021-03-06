module.exports = function (block, blockLength){
  if(!blockLength) blockLength = 16;

  if(!block||block.length%blockLength !== 0) throw new Error("Invalid block.");
  if(!(block instanceof Buffer)) block = new Buffer(block);

  var len = block.length -1;
  var last = block[len];
  var count = 1;

  if (last === 0 || last > 16) paddingException();
  if (last === 1) return unpad(block,len);

  while (block[--len] === last){
    if(++count >= last) return unpad(block,len); 
  }
  paddingException();
}

function paddingException(){
  throw new Error("Invalid padding. Please don't attack me with this clear padding oracle.")
}

function unpad(block,len){
  return block.slice(0,len).toString();
}
