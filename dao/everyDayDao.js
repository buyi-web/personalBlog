var dbutil = require('./dbutil');

//编辑每日一句
function insertEveryDay(en, zh, author, ctime, success){
    var sql = "insert into every_day (`en_content`, `zh_content`, `author`, `ctime`) values (?, ?, ?, ?)";
    var params = [en, zh, author, ctime];
    var connetcion = dbutil.createConnection();
    connetcion.connect();
    connetcion.query(sql, params, function(err, res){
        if(!err){
            success(res);
        }else{
            console.log(err);
        }
    });
    connetcion.end();
}

function queryEveryDay(success){
    var sql = "select * from every_day order by id desc limit 1";
    var params = [];
    var connetcion = dbutil.createConnection();
    connetcion.connect();
    connetcion.query(sql, params, function(err, res){
        if(!err){
            success(res);
        }else{
            console.log(err);
        }
    });
    connetcion.end();
}

module.exports = {
    insertEveryDay,
    queryEveryDay
}