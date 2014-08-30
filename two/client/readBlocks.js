var Transform = require('stream').Transform;

function readBlocks(block){
  Transform.call(this);
  this.block = block||16;
  this.extra = new Buffer(0);
}

readBlocks.prototype = Object.create(Transform.prototype);

readBlocks.prototype._transform = function(chk, enc, cb){
  var block = this.block;
  var extraLen = this.extra.length;
  var bufStart = block - extraLen;
  var bufEnd = chk.length - bufStart;

  bufEnd = bufEnd- bufEnd%block;
  
  this.push(Buffer.concat([this.extra,chk.slice(0,bufStart)],block));
  
   var i = bufStart;
   while(i < bufEnd){
     this.push(chk.slice(i,i+=block));
   }
   
   this.extra = chk.slice(i);
   
   cb(); 
}

readBlocks.prototype._flush = function(cb){
  if(this.extra.length) this.push(extra);
  cb();
}

module.exports = readBlocks;
