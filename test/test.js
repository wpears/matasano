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
});

