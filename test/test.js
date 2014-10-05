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
  /*describe('Question 4', function(){
    it('should read a file, split it into lines, and discover which has been ciphered with a single byte', function(done){
      var xorOnLines = require('../one/break/xorOnFileLines');
      var data = 'one/data/q4.txt';
      
      function lineCb(data){
        assert.equal(data.str, 'Now that the party is jumping\n');
        done();
      }

      xorOnLines(data,lineCb);
    });
  });*/

  describe('Question 5', function(){
    it('encrypts under a repeating key', function(){
      var enc = require('../one/enc/repeatingKeyXor');
      assert.equal(
        enc("Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal", "ICE").toString('hex'),
        '0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f'
        );
    });
  });

  describe('Question 6', function(){
    it('computes correct Hamming distances', function(){
      var hamming = require('../one/break/hamming');
      assert(hamming('this is a test','wokka wokka!!!')===37);
    });

    it('finds the proper key size', function(done){
      var findKey = require('../one/break/findKeysize');
      var hamming = require('../one/break/hamming');
      var read64 = require('read64');

      read64('one/data/q6.txt',function(err,data){
        var keyObj = findKey(data,hamming,{start:3,comparisons:8})[0];
        assert(keyObj.size === 29);
        console.log('Key size: %d',keyObj.size);
        done();
      });
    });

    it('transposes bits from the same positions modulo the key size, creating single-key XORed blocks', function(){
      var transpose = require('../one/break/transpose');
      var bufEqual = require('bufEqual');
      assert(bufEqual(transpose('12345678',2)[0], new Buffer('1256','hex')));
      assert(bufEqual(transpose('12345678',2)[1], new Buffer('3478','hex')));
    });

    /*it('gets the repeating key cipher',function(done){
      var vigenere = require('../one/client/vigenere');

      function checkKey(data){
        assert.equal(data.toString(),'tERmINAtOR x\u001a bring tHE nOIsE');
        done();
      }
      
      vigenere(checkKey,'one/data/q6.txt'); 
    });*/
  });

  describe('Question 7', function(){
    it('decrypts simply with 128bit aes under ecb',function(){
      var aes128ecb = require('../one/break/aes128ecb');
      var crypto = require('crypto');

      var secret = "CaptainMyCaptain";
      var cipher = crypto.createCipheriv('aes-128-ecb',new Buffer('YELLOW SUBMARINE'), new Buffer(0));
      var data = Buffer.concat([cipher.update(secret),cipher.final()]);
      assert.equal(secret,aes128ecb(data));
    });
  });

});

