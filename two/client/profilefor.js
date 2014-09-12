module.exports = function(email){
  email = email.split('&').join('').split('=').join('');
  var str = '';
  var obj = {
    email : email,
    uid : Math.round(Math.random()*1e9),
    role : 'user'
  }
  for (var key in obj){
   str+= key + '=' + obj[key] + '&';
  }
  return str.slice(0,-1);
}
