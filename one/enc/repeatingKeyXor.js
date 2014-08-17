module.exports = function(str, enc){
  var buf = new Buffer(str);
  var encbuf = new Buffer(enc);
  var i = 0;
  while(i < buf.length){
    for(var j=0; j< enc.length; j++){
      buf[i] = buf[i] ^ encbuf[j]; 
      i++;
    }
  }
  return buf.toString('hex')
};
