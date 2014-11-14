var state = new Uint32Array(623);
var index = 0;

function init(seed){
  index = 0;
  state[0] = seed;
  for (var i = 1; i < 623; i++) {
   state[i] =  1812433253 * (state[i-1] ^ state[i-1]>>30) + i;
  }
}


