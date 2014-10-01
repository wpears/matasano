var ecb = require('blockecb');
var xor = require('xor');
var inp= new Buffer("L77na/nrFsKvynd6HzOoG7GHTLXsTVu9qvY/2syLXzhPweyyMTJULu/6/kXX0KSvoOLSFQ==","base64");

var enc = inp.slice(0,16);
var inter = ecb("\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00","YELLOW SUBMARINE");
console.log(xor(inter,enc).toString());
var e2 = inp.slice(16,32);
var i2 = ecb("\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00","YELLOW SUBMARINE");
console.log(xor(i2,e2).toString())


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
