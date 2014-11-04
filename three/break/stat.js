var stat = require('./stat_ctr');
var space = require('spaceNonText');
var xor = require('xor');

module.exports = function(file,cb){
  stat(file,getKey);

function getKey(obj){
  var keyFront = obj.keyFront;
  var ciphers = obj.ciphers;
  keyFront[5]^=79^78;
  keyFront[22]^=78^82;
  keyFront[47]^=104^105;
  keyFront[48] = ciphers[15][48]^69;
  keyFront[49] = ciphers[15][49]^65;
  
  function fillIns (arr){
    var a = new Buffer(arr.length);
    arr.forEach(function(v,i){
      var terms = v.split(',')
      a[i] = ciphers[terms[0]][terms[1]]^terms[2]
    })
    keyFront = Buffer.concat([keyFront,a]);
  }

  var arr = [
    '5,53,69',
    '59,54,101',
    //scene of a crime
    '16,55,114',
    '16,56,105',
    '16,57,109',
    '16,58,101',
    
    //reincarnated
    '22,59,97',
    '22,60,114',
    '22,61,110',
    '22,62,97',
    '22,63,116',
    '22,64,101',
    '22,65,100',
    
    //resuscitation
    '34,66,99',
    '34,67,105',
    '34,68,116',
    '34,69,97',
    '34,70,116',
    '34,71,105',
    '34,72,111',
    '34,73,110',
      
    //performed
    '23,74,114',
    '23,75,109',
    '23,76,101',
    '23,77,100',

    //terrifying
    '33,78,102',
    '33,79,121',
    '33,80,105',
    '33,81,110',
    '33,82,103',

    //resemblance
    '32,83,97',
    '32,84,110',
    '32,85,99',
    '32,86,101',

    //presidents
    '44,87,116',
    '44,88,115',

    //etch-a-sketch
    '20,89,115',
    '20,90,107',
    '20,91,101',
    '20,92,116',
    '20,93,99',
    '20,94,104',

    //heart
    '28,95,101',
    '28,96,97',
    '28,97,114',
    '28,98,116',

    //rest in peace
    '21,99,110',
    '21,100,32',
    '21,101,112',
    '21,102,101',
    '21,103,97',
    '21,104,99',
    '21,105,101',
    
    //whole scenery (looked up this last bit with little to go on)
    '26,106,104',
    '26,107,111',
    '26,108,108',
    '26,109,101',
    '26,110,32',
    '26,111,115',
    '26,112,99',
    '26,113,101',
    '26,114,110',
    '26,115,101',
    '26,116,114',
    '26,117,121'
  ]

  fillIns(arr);
   
/*  ciphers.forEach(function(v,i){
    console.log(i,space(xor(v,keyFront)).toString());
  });*/
  
  cb(keyFront);
}
}

