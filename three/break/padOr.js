var serv = require('../server/padOr');

var cipher = serv.cipher();
var IV = serv.IV;
var plaintext = new Array (cipher.length);
cipher = Buffer.concat([IV,cipher]);
var start = 0;
var currIndex = 15;
var currBlock = cipher.slice(start,start+32);
var interBlock = new Array(16); 
var padding = 1;

while (currIndex >= 0){
  console.log(currIndex);
  var orig = currBlock[currIndex];
  console.log(currBlock[currIndex+1]);
  for(var i=0;i<256;i++){
    currBlock[currIndex] = i;
    if(serv.check(currBlock)){
      // the padding is valid;
      // c1mod == i, p2mod == padding
      // c1mod ^ p2mod = i2 <-- padding oracle leaks p2mod, thus i2
      // c1 ^ i2 = p2
      console.log("Valid");
      var interState = i ^ padding;
      interBlock[currIndex] = interState;
      plaintext[currIndex] = interState^orig;
      pad(currBlock,interBlock,++padding);
      console.log("padded");
      currIndex--;
      var log = new Buffer(16);
      plaintext.forEach(function(v,i){
        log[i]=v;
      });
      console.log(log.toString());
      break;
    }
    if(i===255)console.log("uhoh");
  }
}

function pad(block,interBlock,padding){
  console.log(arguments);
 
  var curr = interBlock.length -1;
 while(interBlock[curr] !== undefined){
   console.log(interBlock[curr]^padding);
   block[curr] = interBlock[curr] ^ padding;
   curr--;
 }  
}
console.log(serv.check(cipher.slice(0,16)));
