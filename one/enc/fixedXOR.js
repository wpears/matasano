module.exports = function(hex1,hex2){
  var buf1, buf2;

  if (hex1 instanceof Buffer) buf1 = hex1;
  else buf1 = new Buffer(hex1,'hex');
  if(hex2 instanceof Buffer) buf2 = hex2;
  else buf2 = new Buffer(hex2,'hex');

  var outbuf = new Buffer(buf1.length);

  for(var i=0, j=buf1.length; i<j; i++){
    outbuf[i] = buf1[i]^buf2[i];
  }
  return outbuf;
};

