var assert = require('assert');

describe('Set 1', function(){
  
  describe('Question 1', function(){
    it('should convert hex to base64', function(){
      var hTo64 = require('../one/enc/hexTo64');
      assert.equal(
        hTo64('49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d'),
        'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t'
        );
    });
  });
  
  describe('Question 2', function(){
    it('should xor two equal-length buffers', function(){
      var xor = require('xor');
      var bufEqual = require('bufEqual');
      var xord = xor(new Buffer('\x05\x1f'),new Buffer('\x07\x20'));
      assert(
        bufEqual(xord,new Buffer('\x02\x3f'))
      );
    });
  });

});

