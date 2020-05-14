var tagsDao = require('../dao/tagsDao');
var tagBlogMappingDao = require('../dao/tagBlogMappingDao');
var blogDao = require('../dao/blogDao');
var url = require('url');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');

var path = new Map();

function queryRandomTags(request, response){
    tagsDao.queryAllTags(function(res){
        res.sort(function(){
            return Math.random > 0.5 ? true:false;
        })
        response.writeHead(200);
        response.write(respUtil.writeResp("success", "查询成功", res));
        response.end();
    })
}
path.set("/queryRandomTags",queryRandomTags);

function queryBlogByTag(request, response){
    var params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, function (res){  
        if(res == null || res.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResp("fail", "查询失败", res));
            response.end();
        }else{
            tagBlogMappingDao.queryBlogByTag(res[0].id, parseInt(params.page), parseInt(params.pageSize), function(res){
                var blogList = [];
                for(var i = 0; i < res.length; i++){
                    blogDao.queryBlogById(res[i].blog_id, function(res){  
                        blogList.push(res[0]);
                    })
                }

                /*查询数据库是异步的，继续执行后面的代码，所以这里拿不到数据 */
                // console.log(blogList);
                // response.writeHead(200);
                // response.write(respUtil.writeResp("success", "查询成功", blogList));
                // response.end();
                getResult(blogList, res.length, response);
                function getResult(blogList, len, response){
                    if (blogList.length < len) {
                        setTimeout(function () {
                            getResult(blogList, len, response);
                        }, 100);
                    }else{
                        response.writeHead(200);
                        response.write(respUtil.writeResp("success", "查询成功", blogList));
                        response.end(); 
                    }
                }
            })
        }
    })
}
path.set('/queryBlogByTag', queryBlogByTag);

function queryCountTagBlog(request, response){
    var params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, function(res){
        tagBlogMappingDao.queryCountTagBlog(res[0].id, function(res){
            response.writeHead(200);
            response.write(respUtil.writeResp("success", "查询成功", res));
            response.end(); 
        })
    })
}
path.set('/queryCountTagBlog', queryCountTagBlog)
module.exports.path = path;

