var dbutil = require('./dbutil');


function insertBlog(title, content, view, tags, ctime, utime, success) {
    var sql = "insert into blog (`title`, `content`, `view`, `tags`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?)";
    var params = [title, content, view, tags, ctime, utime];
    var connetcion = dbutil.createConnection();
    connetcion.connect();
    connetcion.query(sql, params, function (err, res) {
        if (!err) {
            success(res);
        } else {
            console.log(err);
        }
    });
    connetcion.end();
}

function queryBlogByPage(page, pageSize, success) {
    var sql = 'select * from blog order by id desc limit ?, ?;';
    var params = [page * pageSize, pageSize];
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
function queryBlogById(id, success) {
    var sql = "select * from blog where id = ?";
    var params = [id];
    var connetcion = dbutil.createConnection();
    connetcion.connect();
    connetcion.query(sql, params, function (err, res) {
        if (!err) {
            success(res);
        } else {
            console.log(err);
        }
    })
    connetcion.end();
}
function queryBlogCount(success) {
    var sql = 'select count(1) as count from blog';
    var params = [];
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
function queryAllBlog(success){
    var sql = 'select * from blog order by id desc;';
    var params = [];
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

function addViews(id, success){
    var sql = 'update blog set view = view + 1 where id = ?;';
    var params = [id];
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
function queryHotBlog(size, success){
    var sql = 'select * from blog order by view desc limit ?;';
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
    insertBlog,
    queryBlogByPage,
    queryBlogCount,
    queryBlogById,
    queryHotBlog,
    addViews,
    queryAllBlog
}
