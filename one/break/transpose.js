module.exports = function(buf, blockLength){
  blockLength = +blockLength;
  if(!(buf instanceof Buffer)) buf = new Buffer(buf, 'hex');

  var byteLength = buf.length;
  var blockCount = byteLength/blockLength; /*length of transposed buffers*/
  var outBufs = new Array(blockLength);

  for(var i=0; i < outBufs.length; i++){
    outBufs[i] = new Buffer(blockCount);
  } 
  for(i=0; i<buf.length; i+=blockLength){
    for(var j=0; j<outBufs.length;  j++){
      outBufs[j][i/blockLength>>0] = buf[i+j]; 
    } 
  }
  return outBufs;
};


