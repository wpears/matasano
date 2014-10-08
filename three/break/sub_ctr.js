var stat_ctr = require('./stat_ctr'); 
var space = require('spaceNonText');
var xor = require('xor');

module.exports = function(file,cb){
  
  stat_ctr(file,getKeyFront);

  function getKeyFront(keyObj){
    var keyFront = keyObj.keyFront;
    var ciphers = keyObj.ciphers;
    keyFront[6]--; 
console.log(keyFront.length);

    //21 is "when young and beautiful"
    //ful -> 70 85 76
    var iful = new Buffer(4);
    iful[0] = ciphers[21][20]^73;
    iful[1] = ciphers[21][21]^70;
    iful[2] = ciphers[21][22]^85;
    iful[3] = ciphers[21][23]^76;

    // 39 BORN
    var n = new Buffer(1);
    n[0] = ciphers[39][24]^78; 

    // 14 UTTERLY
    var rly = new Buffer(3);
    rly[0] = ciphers[14][25]^82;
    rly[1] = ciphers[14][26]^76;
    rly[2] = ciphers[14][27]^89;

    //13 WORN
    var rn = new Buffer(2);
    rn[0] = ciphers[13][28]^82;
    rn[1] = ciphers[13][29]^78;

    //29 THOUGHT
    var t = new Buffer(1);
    t[0] = ciphers[29][30]^84;

    //27 END
    var nd = new Buffer(2);
    nd[0] = ciphers[27][31]^78;
    nd[1] = ciphers[27][32]^68;

    //4 HEAD
    var ead = new Buffer(3)
      ead[0] = ciphers[4][33]^69;
    ead[1] = ciphers[4][34]^65;
    ead[2] = ciphers[4][35]^68;

    //37 TURN
    var nS = new Buffer(2); 
    nS[0] = ciphers[37][36]^78;
    nS[1] = ciphers[37][37]^32;

    keyFront = Buffer.concat([keyFront,iful,n,rly,rn,t,nd,ead,nS]);
    ciphers.forEach(function(v,i){
      console.log(i,space(xor(v,keyFront)).toString());
    });
    cb(keyFront);   
  }
}


