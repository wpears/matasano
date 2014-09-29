var serv = require('../server/padOr');

var cipher = serv.cipher();
var IV = serv.IV;
cipher = Buffer.concat(IV,cipher);
var start = 0;

while (start < cipher.length){
  var currBlock = cipher.slice(start,start+32);
  var currIndex = 15;
  for(var i=0;i<256;i++){
    currBlock[currIndex] = i;
    if(serv.check(currBlock)){
      //need to save orig byte so i can get plaintext after..
      // c1mod ^ p2mod = i2 <-- padding oracle leaks p2mod, thus i2
      // c1 ^ i2 = p2
    } 
  }
}
console.log(serv.check(cipher.slice(0,16)));
