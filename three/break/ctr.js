var ecb = require('blockecb');
var xor = require('xor');

module.exports = function(buf){
 if(!(buf instanceof Buffer)) buf = new Buffer(buf);
 var key = new Buffer('YELLOW SUBMARINE');
 var nonce = new Buffer(16);
 var output = '';
 for(var i=0; i<16; i++){
  nonce[i] = 0;
 }
 
 var currByte = 8;
 for(i=0; i<buf.length;i+=16){
  var enc = buf.slice(i,i+16);
  var inter = ecb(nonce,key);
  output+=xor(enc,inter).toString();
  nonce[currByte]++;
  if(nonce[currByte]===0){
    nonce[++currByte]++;
  } 
 } 
 return output;
}
