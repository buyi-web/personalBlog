var commentDao = require('../dao/commentDao');
var url = require('url');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');
var svgCaptcha = require('svg-captcha');
var path = new Map();

function addComment(request, response){
    var params = url.parse(request.url, true).query;
    commentDao.insertComment(params.bid, params.reply, params.replyName,params.userName, params.content, params.email, timeUtil.getNowTime(), timeUtil.getNowTime(), function(res){
        response.writeHead(200);
        response.write(respUtil.writeResp("success", "评论成功", null));
        response.end();
    })
}
path.set('/addComment', addComment);

function queryRandomCode(request, response){
    var codeConfig = {
        size: 4, // 验证码长度
        ignoreChars: '0oO1ilI', // 验证码字符中排除 0oO1ilI
        noise: 2, // 干扰线条的数量
        width: 100,
        height: 34,
        fontSize: 50,
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#eee',
      };
      var code = svgCaptcha.create(codeConfig);
      response.writeHead(200);
      response.write(respUtil.writeResp("success", "评论成功", code));
      response.end();
}
path.set('/queryRandomCode', queryRandomCode);

function queryCommentsByBlogId(request, response){
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(params.bid, function(res){
        response.writeHead(200);
        response.write(respUtil.writeResp("success", "评论查询成功", res));
        response.end();
    })
}
path.set('/queryCommentsByBlogId', queryCommentsByBlogId);

function queryCommentsCountByBlogId(request, response){
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsCountByBlogId(params.bid, function(res){
        response.writeHead(200);
        response.write(respUtil.writeResp("success", "查询成功", res));
        response.end();
    })
}
path.set('/queryCommentsCountByBlogId', queryCommentsCountByBlogId);

function queryNewComments(request, response){
    commentDao.queryNewComments(5, function(res){
        response.writeHead(200);
        response.write(respUtil.writeResp("success", "查询成功", res));
        response.end();
    })
}
path.set('/queryNewComments', queryNewComments);
module.exports.path = path;