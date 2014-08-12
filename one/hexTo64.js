module.exports = function(hex){
  var buf = new Buffer(hex,'hex');
  return buf.toString('base64');
};
