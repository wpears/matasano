module.exports = function(buf,len,fn){
  if(!len) len = 16;
  if(!(buf instanceof Buffer)) buf = new Buffer(buf);
  var i = 0;
  var pieces = [];
  while(i < buf.length){
    pieces.push(fn(buf.slice(i,i+=len)));
  }
  return Buffer.concat(pieces);
};
