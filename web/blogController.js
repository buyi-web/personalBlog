var blogDao = require('../dao/blogDao');
var tagsDao = require('../dao/tagsDao');
var tagBlogMappingDao = require('../dao/tagBlogMappingDao');
var url = require('url');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');
var path = new Map();

//按页查找博客
function queryBlogByPage(request, response){
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function(res){
        response.writeHead(200);
        response.write(respUtil.writeResp('success', '查询成功', res));
        response.end()
    })
}
path.set('/queryBlogByPage', queryBlogByPage);

//通过ID查找博客
function queryBlogById(request, response){
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogById(params.bid, function(res){
        response.writeHead(200);
        response.write(respUtil.writeResp('success', '查询成功', res));
        response.end()
        blogDao.addViews(params.bid, function(res){})
    })
}
path.set('/queryBlogById', queryBlogById);

//查找博客的总数
function queryBlogCount(request, response){
    blogDao.queryBlogCount(function(res){
        response.writeHead(200);
        response.write(respUtil.writeResp("success", "查询成功", res));
        response.end();
    })
}
path.set('/queryBlogCount', queryBlogCount);

//编辑博客
function editBlog(request, response){
    var params = url.parse(request.url, true).query;
    var tags = params.tags.replace(/ /g, "").replace("，", ","); // 去掉tags中的空白字符，中文,用英文替代
    request.on('data', function(data){
        console.log(data.toString().trim());
        blogDao.insertBlog(params.title, data.toString().trim(), 0, tags, timeUtil.getNowTime(),timeUtil.getNowTime(),function(res){
            response.writeHead(200);
            response.write(respUtil.writeResp('success', '添加成功', null));
            response.end();

            var blogId = res.insertId;
            var tagList = tags.split(',');
            for(var i = 0; i < tagList.length; i++){
                if(tagList == ""){
                    continue;
                }
                queryTag(tagList[i], blogId)
            }
        })
    })
}

//查询标签
function queryTag(tag, blogId){
    tagsDao.queryTag(tag, function(res){ 
        if(res == null || res.length == 0){
            insertTag(tag, blogId);
        }else{
            insertTagBlogMapping(res[0].id, blogId)
        }
    })
}
//增加标签
function insertTag(tag, blogId){
    tagsDao.insertTag(tag, timeUtil.getNowTime(), timeUtil.getNowTime(), function(res){
        var tagId = res.insertId;
        insertTagBlogMapping(tagId, blogId);
    })
}
//插入标签和博客的映射
function insertTagBlogMapping(tagId, blogId){
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNowTime(), timeUtil.getNowTime(), function(res){

    })
}
path.set('/editBlog', editBlog);

/**
 * 查询所有blog
 * @param {*} request 
 * @param {*} response 
 */
function queryAllBlog(request, response){
    blogDao.queryAllBlog(function(res){
        response.writeHead(200);
        response.write(respUtil.writeResp('success', '查询成功', res));
        response.end();
    })
}
path.set('/queryAllBlog', queryAllBlog);

//查热门博客
function queryHotBlog(request, response){
    blogDao.queryHotBlog(5, function(res){
        response.writeHead(200);
        response.write(respUtil.writeResp('success', '查询成功', res));
        response.end();
    })
}
path.set("/queryHotBlog", queryHotBlog)

module.exports.path = path;

