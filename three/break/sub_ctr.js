module.exports = function(){
  var ctr = require('./ctr');
  var space = require('spaceNonText');
  var xor = require('xor');

  var vig = require('../../one/client/vig');

  var strs=['SSBoYXZlIG1ldCB0aGVtIGF0IGNsb3NlIG9mIGRheQ==',
      'Q29taW5nIHdpdGggdml2aWQgZmFjZXM=',
      'RnJvbSBjb3VudGVyIG9yIGRlc2sgYW1vbmcgZ3JleQ==',
      'RWlnaHRlZW50aC1jZW50dXJ5IGhvdXNlcy4=',
      'SSBoYXZlIHBhc3NlZCB3aXRoIGEgbm9kIG9mIHRoZSBoZWFk',
      'T3IgcG9saXRlIG1lYW5pbmdsZXNzIHdvcmRzLA==',
      'T3IgaGF2ZSBsaW5nZXJlZCBhd2hpbGUgYW5kIHNhaWQ=',
      'UG9saXRlIG1lYW5pbmdsZXNzIHdvcmRzLA==',
      'QW5kIHRob3VnaHQgYmVmb3JlIEkgaGFkIGRvbmU=',
      'T2YgYSBtb2NraW5nIHRhbGUgb3IgYSBnaWJl',
      'VG8gcGxlYXNlIGEgY29tcGFuaW9u',
      'QXJvdW5kIHRoZSBmaXJlIGF0IHRoZSBjbHViLA==',
      'QmVpbmcgY2VydGFpbiB0aGF0IHRoZXkgYW5kIEk=',
      'QnV0IGxpdmVkIHdoZXJlIG1vdGxleSBpcyB3b3JuOg==',
      'QWxsIGNoYW5nZWQsIGNoYW5nZWQgdXR0ZXJseTo=',
      'QSB0ZXJyaWJsZSBiZWF1dHkgaXMgYm9ybi4=',
      'VGhhdCB3b21hbidzIGRheXMgd2VyZSBzcGVudA==',
      'SW4gaWdub3JhbnQgZ29vZCB3aWxsLA==',
      'SGVyIG5pZ2h0cyBpbiBhcmd1bWVudA==',
      'VW50aWwgaGVyIHZvaWNlIGdyZXcgc2hyaWxsLg==',
      'V2hhdCB2b2ljZSBtb3JlIHN3ZWV0IHRoYW4gaGVycw==',
      'V2hlbiB5b3VuZyBhbmQgYmVhdXRpZnVsLA==',
      'U2hlIHJvZGUgdG8gaGFycmllcnM/',
      'VGhpcyBtYW4gaGFkIGtlcHQgYSBzY2hvb2w=',
      'QW5kIHJvZGUgb3VyIHdpbmdlZCBob3JzZS4=',
      'VGhpcyBvdGhlciBoaXMgaGVscGVyIGFuZCBmcmllbmQ=',
      'V2FzIGNvbWluZyBpbnRvIGhpcyBmb3JjZTs=',
      'SGUgbWlnaHQgaGF2ZSB3b24gZmFtZSBpbiB0aGUgZW5kLA==',
      'U28gc2Vuc2l0aXZlIGhpcyBuYXR1cmUgc2VlbWVkLA==',
      'U28gZGFyaW5nIGFuZCBzd2VldCBoaXMgdGhvdWdodC4=',
      'VGhpcyBvdGhlciBtYW4gSSBoYWQgZHJlYW1lZA==',
      'QSBkcnVua2VuLCB2YWluLWdsb3Jpb3VzIGxvdXQu',
      'SGUgaGFkIGRvbmUgbW9zdCBiaXR0ZXIgd3Jvbmc=',
      'VG8gc29tZSB3aG8gYXJlIG5lYXIgbXkgaGVhcnQs',
      'WWV0IEkgbnVtYmVyIGhpbSBpbiB0aGUgc29uZzs=',
      'SGUsIHRvbywgaGFzIHJlc2lnbmVkIGhpcyBwYXJ0',
      'SW4gdGhlIGNhc3VhbCBjb21lZHk7',
      'SGUsIHRvbywgaGFzIGJlZW4gY2hhbmdlZCBpbiBoaXMgdHVybiw=',
      'VHJhbnNmb3JtZWQgdXR0ZXJseTo=',
      'QSB0ZXJyaWJsZSBiZWF1dHkgaXMgYm9ybi4=']

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

  return keyFront;
  /*c2.forEach(function(v,i){
    console.log(i,space(xor(v,keyFront)).toString());
    });*/
}




