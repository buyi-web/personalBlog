var fs = require('fs');
var globalConf = {};

var confFile = fs.readFileSync('./server.conf');
var confs = confFile.toString().split('\n');

for(var i = 0; i<confs.length; i++){
    var conf = confs[i].trim().split('=');
    globalConf[conf[0]] = conf[1];
}
// console.log(globalConf);
module.exports = globalConf;

