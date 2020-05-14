var dbutil = require('./dbutil');



function insertTag(tag, ctime, utime, success){
    var sql = "insert into tags (`tag`, `ctime`, `utime`) values (?, ?, ?)";
    var params = [tag, ctime, utime];
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

function queryTag(tag, success){
    var sql = "select * from tags where tag = ?";
    var params = [tag];
    var connetcion = dbutil.createConnection();
    connetcion.connect();
    connetcion.query(sql, params, function(err, res){
        if(!err){
            success(res);
        }else{
            console.log(err);
        }
    })
    connetcion.end();
}
function queryAllTags(success){
    var sql = "select * from tags;";
    var params = [];
    var connetcion = dbutil.createConnection();
    connetcion.connect();
    connetcion.query(sql, params, function(err, res){
        if(!err){
            success(res);
        }else{
            console.log(err);
        }
    })
    connetcion.end();
}

module.exports = {
    queryTag,
    insertTag,
    queryAllTags
}