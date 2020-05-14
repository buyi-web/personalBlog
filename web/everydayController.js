var everyDayDao = require('../dao/everyDayDao');
var formidable = require('formidable');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');

var path = new Map();

function editEveryDay(request, response){
    var form = new formidable.IncomingForm();
    form.parse(request,function(err, fields, files){
        if(err) throw err;
        console.log(fields);
        everyDayDao.insertEveryDay(fields.en, fields.zh, fields.author, timeUtil.getNowTime(), function(res){
            response.writeHead(200);
            response.write(respUtil.writeResp('success', '添加成功', null));
            response.end();
        })
    });
}
path.set('/editEveryDay', editEveryDay);

function queryEveryDay(request, response){
    everyDayDao.queryEveryDay(function(res){
        response.writeHead(200, {"location": "/index.html"});
        response.write(respUtil.writeResp('success', '添加成功', res));
        response.end();
    })
}
path.set('/queryEveryDay', queryEveryDay);

module.exports.path = path;