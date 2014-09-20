module.exports = function (a,b){
  if(!(a instanceof Buffer)||!(b instanceof Buffer)) return 0;
  if(a.length !== b.length) return 0;
  
  for(var i=0; i < a.length; i++){
    if(a[i] !== b[i]) return 0;
  }
  return 1;
};
