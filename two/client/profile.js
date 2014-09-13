module.exports = function(email){
  email = email.split('&').join('').split('=').join('');
  var str = '';
  var obj = {
    email : email,
    uid : 1e8,
    role : 'user'
  }
  for (var key in obj){
   str+= key + '=' + obj[key] + '&';
  }
  return str.slice(0,-1);
}
