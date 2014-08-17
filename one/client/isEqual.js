var args = process.argv;

var s1 = args[2].split(/\s+/).join('');
var s2 = args[3].split(/\s+/).join('');
console.log("s1: %s\ns2: %s",s1,s2);
console.log(s1 === s2);

