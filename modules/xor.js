module.exports = function(buf1,buf2){
  if(!(buf1 instanceof Buffer)) buf1 = new Buffer(buf1);
  if(!(buf2 instanceof Buffer)) buf2 = new Buffer(buf2);

  var outbuf = new Buffer(buf1.length);

  for(var i=0, j=buf1.length; i<j; i++){
    outbuf[i] = buf1[i]^buf2[i];
  }
  return outbuf;
};

