var fs = require('fs');

module.exports = function(file,cb){
  fs.readFile(file,function(err, data){
    var str = data.toString();
    cb(err,new Buffer(str,'base64'));
  })
}
