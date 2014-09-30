var serv = require('../server/padOr');

var cipher = serv.cipher();
var IV = serv.IV;
var plaintext = new Array (cipher.length);
cipher = Buffer.concat([IV,cipher]);
var start = 0;

while (start < cipher.length){
  var currBlock = cipher.slice(start,start+32);
  var currIndex = 15;
  var orig = currBlock[currIndex];
  var padding = 1;

  for(var i=0;i<256;i++){
    currBlock[currIndex] = i;
    if(serv.check(currBlock)){
      // the padding is valid;
      // c1mod == i, p2mod = padding
      // c1mod ^ p2mod = i2 <-- padding oracle leaks p2mod, thus i2
      // c1 ^ i2 = p2
      var interState = i ^ padding;
      plaintext[currIndex] = interState^orig;
      currBlock[currIndex] = interState^++padding;
      currIndex--;
    }
    console.log(plaintext);
  }
}
console.log(serv.check(cipher.slice(0,16)));
