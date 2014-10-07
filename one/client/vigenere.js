var read64 = require('./read64');
var vig = require('./vig');

module.exports = function(cb,file){
  file =  file || '../data/q6.txt';
  read64(file, function(err,data){
    if(err)throw err;
    var keySize = 29;
    var cipher = vig(data,keySize); 
    console.log("KEY: %s\n",cipher.toString());
    cb(cipher);
  });
}
