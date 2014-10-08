var assert = require('assert');

describe('\n************************ Set 1 ************************\n\n', function(){

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

  describe('Question 8', function(){
    it('looks for ecb encoded messages by sniffing out repeated blocks',function(done){
      var ecbSearch = require('../one/break/hexecb');

      function checkIndex(index,ciphertext){
        assert.equal(132,index);
        done();
      }

      ecbSearch('one/data/q8.txt',checkIndex);
    });
  });
});

describe('\n************************ Set 2 ************************\n\n',function(){
  describe('Question 9', function(){
    it('implements PKCS#7 padding',function(){
      var pk = require('pkcs7');
      var bufEqual = require('bufEqual');
      assert(bufEqual(pk.pad('Wyatt Pearsall'),new Buffer('Wyatt Pearsall\x02\x02')));
      assert(bufEqual(pk.pad('PEARSALLPEARSALL'),new Buffer('PEARSALLPEARSALL\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10')));
    }); 
  });
  
  describe('Question 10', function(){
    it('should cbc encrypt and decrypt', function(){
      var enc = require('enc_cbc');
      var dec = require('dec_cbc');
      assert.equal("SOMEBITOFTEXTEH?",dec(enc("SOMEBITOFTEXTEH?")).toString()); 
    });
  });

  describe('Question 11', function(){
    it('should detect if something ecb or not', function(){
      var discern = require('../two/enc/discernMethod');
      assert.equal(1,discern(function(){return "PEARSALLPEARSALLPEARSALLPEARSALL"})); 
      assert.equal(0,discern(function(){return "PEAyuooSALLProouRSALLPEuuRSALLPEwqeSALL"}));
    });
  });
 /* describe('Question 12', function(){
    it('breaks ecb, a byte at a time', function(){
      this.timeout(10000);
      var breakEcb = require('../two/break/ecbOracle');
      assert.equal('Rollin', breakEcb().slice(0,6));
    });
  });*/

  describe('Question 13', function(){
    it('breaks ecb by moving a block strategically to taint a function\'s input',function(){
      var admin = require('../two/client/admin'); 
      assert.equal(admin().role, 'admin');
    });
  });

  /*describe('Question 14', function(){
    it('breaks ecb, a byte at a time, with random bytes prepended', function(){
      this.timeout(200000);
      var breakEcb = require('../two/break/ecbOr14');
      assert.equal('Rollin', breakEcb().slice(0,6));
    });
  });*/

  describe('Question 15', function(){
    it('validates pkcs#7',function(){
      var pk = require('pkcs7');
      assert(pk.check('validpadding\x04\x04\x04\x04'));
      assert(!pk.check('invalidpadding12'));
    });
  });
  
  describe('Question 16', function(){
    it('injects unexpected data into cbc by poisoning ciphertexts',function(){
      var bf = require('../two/client/bf');
      assert(bf().match(/;admin=true/));
    });
  });
});

describe('\n**********************Set 3**************************\n\n',function(){
  /*describe('Question 17',function(){
    it('breaks CBC with a padding oracle',function(){
      var padOr = require('../three/break/padOr');
      var obj = {
      'MDAwMDAwTm93IHRoYXQgdGhlIHBhcnR5IGlzIGp1bXBpbmc=':1,
      'MDAwMDAxV2l0aCB0aGUgYmFzcyBraWNrZWQgaW4gYW5kIHRoZSBWZWdhJ3MgYXJlIHB1bXBpbic=':1,
      'MDAwMDAyUXVpY2sgdG8gdGhlIHBvaW50LCB0byB0aGUgcG9pbnQsIG5vIGZha2luZw==':1,
      'MDAwMDAzQ29va2luZyBNQydzIGxpa2UgYSBwb3VuZCBvZiBiYWNvbg==':1,
      'MDAwMDA0QnVybmluZyAnZW0sIGlmIHlvdSBhaW4ndCBxdWljayBhbmQgbmltYmxl':1,
      'MDAwMDA1SSBnbyBjcmF6eSB3aGVuIEkgaGVhciBhIGN5bWJhbA==':1,
      'MDAwMDA2QW5kIGEgaGlnaCBoYXQgd2l0aCBhIHNvdXBlZCB1cCB0ZW1wbw==':1,
      'MDAwMDA3SSdtIG9uIGEgcm9sbCwgaXQncyB0aW1lIHRvIGdvIHNvbG8=':1,
      'MDAwMDA4b2xsaW4nIGluIG15IGZpdmUgcG9pbnQgb2g=':1,
      'MDAwMDA5aXRoIG15IHJhZy10b3AgZG93biBzbyBteSBoYWlyIGNhbiBibG93':1,
      };
      var plaintext = padOr();
      var trueEnd = plaintext.length-plaintext[plaintext.length-1];
      plaintext= plaintext.slice(0,trueEnd);
      assert(obj[plaintext.toString()]);
    });
  });*/
  describe('Question 18', function(){
    it('decrypts with CTR mode',function(){
      var ctr = require('../three/break/ctr');
      var justText = require('justText');
      var inp = new Buffer("L77na/nrFsKvynd6HzOoG7GHTLXsTVu9qvY/2syLXzhPweyyMTJULu/6/kXX0KSvoOLSFQ==","base64");
      assert.equal(justText(ctr(inp)).toString(),"Yo, VIP Let's kick it Ice, Ice, baby Ice, Ice, baby ");
    });
  });
  describe('Question 19', function(){
    it('arduously and circuitously gets the key from repeated nonce CTR',function(done){
      var sub_ctr = require('../three/break/sub_ctr');
      sub_ctr('three/data/19.txt',cb);
      function cb(key){
        assert.equal(key.toString('base64'),'VtHLS4+iZsLjjwNdbDPDUtLMbNy4TTL+7/o/s4/OUzgNgK7rMXc=');
        done();
      }
    });
  });
});

describe('\n*******************Modules***********************\n\n', function(){
  describe('justText', function(){
    it('takes non-ASCII characters out of a buffer', function(){
      var justText = require('justText');    
      var bufEqual = require('bufEqual');
      var text = "Wyatt Pearsall"; 
      var textBuf = new Buffer(text);
      var junk = new Buffer(3);
      junk[0] = 2;
      junk[1] = 9;
      junk[2] = 0;
      var textCleaned = justText(Buffer.concat([textBuf,junk]));
      assert(bufEqual(textCleaned,textBuf)); 
    });
  });
  
  describe('block ecb', function(){
    it('performs ecb encryption on a single block', function(){
      var enc = require('blockecb');
      var buf = new Buffer("I'm back and I'm");
      var bufEqual = require('bufEqual');
      assert(bufEqual(enc(buf),new Buffer('CRIwqt4+szDbqkNY+I0qbD','base64')));
    });
  });
  
  describe('block cbc', function(){
    it('performs cbc encryption on a single block', function(){
      var enc = require('blockcbc');
      var buf =  new Buffer('abraham lincoln!');
      var bufEqual = require('bufEqual');
      assert(bufEqual(enc(buf), new Buffer('GUA8Wra/mOKA4Tt7W2qUIw==','base64')));
    });
  });
  
  describe('ECB', function(){
    it('ecb encryption and decryption', function(){
      var enc = require('enc_ecb');
      var dec = require('dec_ecb');
      assert.equal("PEARSALLPEARSALL",dec(enc("PEARSALLPEARSALL")).toString()); 
    });
  });
  
  describe('CBC', function(){
    it('cbc encryption and decryption', function(){
      var enc = require('enc_cbc');
      var dec = require('dec_cbc');
      assert.equal("PEARSALLPEARSALL",dec(enc("PEARSALLPEARSALL")).toString()); 
    });
  });

});
