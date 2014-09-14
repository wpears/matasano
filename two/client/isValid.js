module.exports = function (block){
  var len = block.length -1;
  var last = block[len];
  var count =1;

  if (last === 0 || last > 16) return 0;

  while (block[--len] === last){
    if(++count >= last) return 1;
  }
  throw new Error("Invalid padding. Please don't attack me with this clear padding oracle.")
}
