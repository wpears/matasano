module.exports = function(cookie){
var arr = cookie.split('&');
var obj = {};

arr.forEach(function(v){
  var curr = v.split('=');
  if(curr.length===2){
    obj[curr[0]] = curr[1];
  }
});

return obj;
};
