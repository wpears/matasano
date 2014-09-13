var enc = require('./encProf');
var dec = require('./decProf');
var prof = require('./profile');
var kv = require('./kv');

module.exports = function(email){

if(!email) email = 'def@ult.com';

var malRole = "w@l.pe"
var malAd = "wy@ttp.comadmin";

var profRole=prof(malRole);
var profAd=prof(malAd);
var profEmail = prof(email);

var bufRole = enc(profRole).slice(16,32);
var bufAd = enc(profAd).slice(16,32);
var bufEmail = enc(profEmail);

var broken = Buffer.concat([bufEmail,bufRole,bufAd]);

return kv(dec(broken));
}

