var serv = require('../server/padOr');

module.exports = function(){
  var cipher = serv.cipher();
  var IV = serv.IV;
  var plaintext = new Array (cipher.length);
  cipher = Buffer.concat([IV,cipher]);


  for(var i=0,len=cipher.length-32; i<= len; i+=16){
    var currBlock = cipher.slice(i,i+32);
    processBlock(currBlock,i);
  }

  var buf = new Buffer(plaintext.length);
  plaintext.forEach(function(v,i){
    buf[i]=v;
  });


  function processBlock(block,loc){
    var interBlock = new Array(16);
    var index = 15;
    var padding = 1;

    while (index >= 0){
      var orig = block[index];
      for(var i=0;i<256;i++){
        block[index] = i;
        if(serv.check(block,16-index)){
          // the padding is valid;
          // c1mod == i, p2mod == padding
          // c1mod ^ p2mod = i2 <-- padding oracle leaks p2mod, thus i2
          // c1 ^ i2 = p2
          var interState = i ^ padding;
          interBlock[index] = interState;
          plaintext[loc+index] = interState^orig;
          pad(block,interBlock,++padding);
          index--;
          break;
        }
        if(i===255){
          console.log("Uh-oh, need to check padding better.");
          return;
        }
      }
    }
  }

  function pad(block,interBlock,padding){
    var curr = interBlock.length -1;
    while(interBlock[curr] !== undefined){
      block[curr] = interBlock[curr] ^ padding;
      curr--;
    }  
  }

  return buf;
}
