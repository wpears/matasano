module.exports = function(file,cb){
  var ctr = require('./ctr');
  var space = require('spaceNonText');
  var xor = require('xor');
  var vig = require('../../one/client/vig');
  var fs = require('fs');

  fs.readFile(file,function(err,data){
    if(err) throw err;

    var strs = data.toString().split('\n');  
    strs.pop();
    
    var ciphers=[];
    var c1 = [];
    var c2 = [];
    strs.forEach(function(v){
      var raw = new Buffer(v,'base64');
      var enc = ctr(raw);
      ciphers.push(enc);
      c1.push(enc.slice(0,21));
      c2.push(enc.slice(0,38));
    });

    var b1 = Buffer.concat(c1);
    var keyFront = vig(b1,21);
    keyFront[6]--;


    //21 is "when young and beautiful"
    //ful -> 70 85 76
    var ful = new Buffer(3);
    ful[0] = ciphers[21][21]^70;
    ful[1] = ciphers[21][22]^85;
    ful[2] = ciphers[21][23]^76;

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


    keyFront = Buffer.concat([keyFront,ful,n,rly,rn,t,nd,ead,nS]);

    cb(keyFront);
    /*c2.forEach(function(v,i){
      console.log(i,space(xor(v,keyFront)).toString());
      });*/
  })
}




