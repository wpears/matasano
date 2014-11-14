var state = new Uint32Array(623);
var index = 0;

function init(seed){
  index = 0;
  state[0] = seed;
  for (var i = 1; i < 624; i++) {
   state[i] =  1812433253 * ((state[i-1] ^ (state[i-1]>>>30))>>>0) + i;
  }
}

function getNumber() {
  if(index === 0) generateNumbers();
  var y = state[index];
  y = (y ^ y >>> 11) >>> 0;
  y = (y ^ (y <<  7 & 2636928640)) >>> 0;
  y = (y ^ (y <<  15 & 4022730752)) >>> 0;
  y = (y ^ y >>> 18) >>> 0;

  index = (index + 1) % 624;
  return y;
}

function generateNumbers(){
  for (var i = 0; i < 624; i++) {
    var y= (state[i] & 0x80000000)>>>0 + (state[(i+1)%624] & 0x7fffffff) >>> 0;
    state[i] = (state[(i+397)%624] ^ y >>> 1) >>> 0;
    if(y%2 !== 0){
      state[i] = (state[i] ^ 2567483615) >>> 0;
    }
  }
}


