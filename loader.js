var fs = require('fs')
var globalConf = require('./config')

var pathMap = new Map();
var controllerSet = [];
var files = fs.readdirSync(globalConf.web_path);

for(var i = 0; i<files.length; i++){
    var file = require('./'+globalConf.web_path+'/'+files[i]);
    if(file.path){
        for (const [key, value] of file.path) {
            if(!pathMap.get(key)){
                pathMap.set(key, value)
            }else{
                throw new Error("url异常 url:"+key);
            }
        }
        controllerSet.push(file);      
    }
}

module.exports = {
    pathMap: pathMap,
    controllerSet: controllerSet
}