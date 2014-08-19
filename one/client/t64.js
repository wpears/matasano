var fs = require('fs');

fs.readFile('t64.dat',function(e,d){
  var data = d.toString();
  var buf = new Buffer(data,'base64');
  console.log('got it',buf.toString());
})
fs.readFile('t64.dat',{encoding:'base64'},function(e,d){
  console.log(d);
  var bytes = new Buffer(d,'base64');

  console.log('64', bytes);
})

fs.readFile('t.dat',function(e,d){
  console.log('str',d)
})

