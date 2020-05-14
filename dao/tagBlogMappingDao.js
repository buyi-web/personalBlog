var dbutil = require('./dbutil');

function insertTagBlogMapping(tagId, blogId, ctime, utime, success){
    var sql = "insert into tag_blog_mapping (`tag_id`, `blog_id`,`ctime`, `utime`) values(?, ?, ?, ?)";
    var params = [tagId, blogId, ctime, utime];
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
function queryBlogByTag(tagId, page, pageSize, success){
    var sql = "select * from tag_blog_mapping where tag_id = ? limit ?, ?;";
    var params = [tagId, page * pageSize, pageSize];
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

function queryCountTagBlog(tagId, success){
    var sql = "select count(1) as count from tag_blog_mapping where tag_id = ?;";
    var params = [tagId];
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
    insertTagBlogMapping,
    queryBlogByTag,
    queryCountTagBlog
}