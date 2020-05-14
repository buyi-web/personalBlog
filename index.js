var express = require('express');
var globalConf = require('./config');
var loader = require('./loader')
var app = new express();
app.use(express.static('./page/'));
app.listen(globalConf.port, function(){
    console.log("start running")
})

app.post('/editEveryDay', loader.pathMap.get('/editEveryDay'));
app.get('/queryEveryDay', loader.pathMap.get('/queryEveryDay'));

app.post('/editBlog', loader.pathMap.get('/editBlog'));
app.get('/queryBlogByPage', loader.pathMap.get('/queryBlogByPage'));
app.get('/queryBlogCount', loader.pathMap.get('/queryBlogCount'));
app.get('/queryBlogById', loader.pathMap.get('/queryBlogById'));
app.get('/addComment', loader.pathMap.get('/addComment'));
app.get('/queryRandomCode', loader.pathMap.get('/queryRandomCode'));
app.get('/queryCommentsByBlogId', loader.pathMap.get('/queryCommentsByBlogId'));
app.get('/queryCommentsCountByBlogId', loader.pathMap.get('/queryCommentsCountByBlogId'));
app.get('/queryAllBlog', loader.pathMap.get('/queryAllBlog'));
app.get('/queryRandomTags', loader.pathMap.get('/queryRandomTags'));
app.get('/queryHotBlog', loader.pathMap.get('/queryHotBlog'));
app.get('/queryNewComments', loader.pathMap.get('/queryNewComments'));
app.get('/queryBlogByTag', loader.pathMap.get('/queryBlogByTag'));
app.get('/queryCountTagBlog', loader.pathMap.get('/queryCountTagBlog'));