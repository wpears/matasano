module.exports = function(data, blockLength){
  blockLength = +blockLength/2;
  var buf = new Buffer(data, 'hex');
  var outBufs = new Array(data.length/blockLength);
  console.log(data.length,blockLength,outBufs.length);
  for(var i=0; i < outBufs.length; i++){
    outBufs[i] = new Buffer(blockLength);
  } 
  for(i=0; i<buf.length; i+=blockLength){
    for(var j=0; j<outBufs.length;  j++){
      outBufs[j][i/blockLength>>0] = buf[i+j]; 
    } 
  }
  return outBufs;
};
