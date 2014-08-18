var t= require('../break/transpose');
var args = process.argv;
console.log(args)
var arr = t(args[2],args[3]);

arr.forEach(function(v){
  console.log(v,v.toString('hex'))
});
