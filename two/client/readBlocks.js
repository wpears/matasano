var Transform = require('stream').Transform;

function readBlocks(block,encoding){
  Transform.call(this);
  this.block = block||16;
  this.enc = encoding;
  this.extra = new Buffer(0);
}

readBlocks.prototype = Object.create(Transform.prototype);

readBlocks.prototype._transform = function(chk, enc, cb){
  var block = this.block;
  var extraLen = this.extra.length;
  var bufStart = block - extraLen;
  var chunk;

  if(this.enc){
    var str = chk.toString();
    chunk = new Buffer(str,this.enc);
  }else{
    chunk = chk;
  }

  var bufEnd = chunk.length - chunk.length%block;
  
  this.push(Buffer.concat([this.extra,chunk.slice(0,bufStart)],block));
  
   var i = bufStart;
   while(i < bufEnd){
     this.push(chunk.slice(i,i+=block));
   }
   this.extra = chunk.slice(i);
   
   cb(); 
}

readBlocks.prototype._flush = function(cb){
  if(this.extra.length) this.push(this.extra);
  cb();
}

module.exports = readBlocks;
