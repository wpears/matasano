module.exports = function(num){
  var count = 0;
  while(num){
    num &= num - 1;
    count++;
  }
  return count;
};

