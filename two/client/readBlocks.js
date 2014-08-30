var Transform = require('stream').Transform;

function readBlocks(){
  Transform.call(this);
  this.extra = new Buffer(0);
}


readBlocks.prototype._transform = function(chk, enc, cb){
  var extraLen = this.extra.length;
  var bufStart = 16 - extraLen;
  
  this.push(Buffer.concat([this.extra,chk.slice(0,bufStart)],16));
  
  //move chunk
   for(var i=bufStart; i < chk.length; i+=16){
     this.push(chk.slice(i,i+16));
   }



}
