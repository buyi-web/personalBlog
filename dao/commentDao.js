var dbutil = require('./dbutil');

function insertComment(blogId, reply, replyName, userName, comment, email, ctime, utime, success){
    var sql = "insert into comments (blog_id, reply, reply_name, username, comment, email, ctime, utime) values (?,?,?,?,?,?,?,?);"
    var params = [blogId, reply, replyName, userName, comment, email, ctime, utime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function(err, res){
        if(!err){
            success(res)
        }else{
            console.log(err);
        }
    });
    connection.end();
}
function queryCommentsByBlogId(blogId, success){
    var sql = "select * from comments where blog_id = ?"
    var params = [blogId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function(err, res){
        if(!err){
            success(res)
        }else{
            console.log(err);
        }
    });
    connection.end();
}

function queryCommentsCountByBlogId(blogId, success){
    var sql = "select count(1) as count from comments where blog_id = ?;"
    var params = [blogId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function(err, res){
        if(!err){
            success(res)
        }else{
            console.log(err);
        }
    });
    connection.end();
}
function queryNewComments(size, success){
    var sql = 'select * from comments order by id desc limit ?;';
    var params = [size];
    var connetcion = dbutil.createConnection();
    connetcion.connect();
    connetcion.query(sql, params, function (err, res) {
        if (!err) {
            success(res)
        } else {
            console.log(err);
        }
    })
    connetcion.end();
}
module.exports = {
    insertComment,
    queryCommentsByBlogId,
    queryCommentsCountByBlogId,
    queryNewComments
}