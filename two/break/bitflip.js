/*
 *XOR by admin=true;....
 * */

var pre = "comment1=cooking%20MCs;userdata=";
var post = ";comment2=%20like%20a%20pound%20of%20bacon";
var crypto = require('crypto');

var pk = require('./pkcs7');
var cbc = require('./cbc');

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
