/*
 *XOR by admin=true;....
 LastCiph XOR currDec = PT
 currDec = Last XOR PT

 ;admin=true;xxxx = LastCiph XOR LastCiph XOR currDec XOR currDec XOR ;admin
 meaning set LastCiph to currDec XOR ;admin=true;xxxx
 
 * */

var pre = "comment1=cooking%20MCs;userdata=";
var post = ";comment2=%20like%20a%20pound%20of%20bacon";
var crypto = require('crypto');

var pk = require('../enc/pkcs7');
var cbc = require('../enc/cbc');

var decCbc = require('./cbc');

var key = crypto.randomBytes(16);
var IV = crypto.randomBytes(16);


module.exports = {
  encrypt:encrypt,
  decrypt:decrypt
}

function encrypt (input){
  var encoded = input.split(';').join('%3B').split('=').join('%3D');
  var fullString = pre + encoded + post;
  var padded = pk(fullString);  

  return cbc(padded,key,IV);
}

function decrypt (enc){
  var dec = decCbc(enc, key, IV).toString();
  console.log( /;admin=true;/.test(dec));
  return dec; 
}
