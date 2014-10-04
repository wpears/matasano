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

  describe('Question 3', function(){
    it('should decode strings ciphered with a single byte', function(){
      var singleByte = require('../one/break/singleByteXor');
      assert.equal(
        singleByte(new Buffer('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736','hex')).str,
        'cOOKING\u0000mc\u0007S\u0000LIKE\u0000A\u0000POUND\u0000OF\u0000BACON'
        );
    });
  });
  describe('Question 4', function(){
    it('should read a file, split it into lines, and discover which has been ciphered with a single byte', function(done){
      var xorOnLines = require('../one/break/xorOnFileLines');
      var data = 'one/data/q4.txt';
      
      function lineCb(data){
        assert.equal(data.str, 'Now that the party is jumping\n');
        done();
      }

      xorOnLines(data,lineCb);
    });
  });
  


});

