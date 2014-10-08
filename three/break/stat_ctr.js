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
    
    var len = Infinity;

    strs.forEach(function(v){
      var raw = new Buffer(v,'base64');
      var enc = ctr(raw);
      ciphers.push(enc);
      if(enc.length < len) len = enc.length;
    });

    ciphers.forEach(function(v){
      c1.push(v.slice(0,len));
    })
     
    var b1 = Buffer.concat(c1);
    var keyFront = vig(b1,len);
    
    cb({keyFront:keyFront,ciphers:ciphers});
  });
}
