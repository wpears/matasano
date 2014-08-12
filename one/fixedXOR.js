module.exports = function(hex1,hex2){
  var buf1 = new Buffer(hex1,'hex');
  var buf2 = new Buffer(hex2,'hex');
  
  for(var i=0, j=buf1.length; i<j; i++){
    buf1[i] = buf1[i]^buf2[i];
  }
  return buf1.toString('hex');
};

