var everyDay = new Vue({
    el: "#every-day",
    data: {
        zhText: "巴拉巴拉巴拉巴拉",
        enText: "balabalabalabala",
        author: "匿名"
    },
    created() {
        //发送请求，获取数据
        axios({
            method: "get",
            url: "/queryEveryDay"
        }).then(function (res) {
            // console.log(res.data.data[0]);
            if (res.data.status == "success") {
                everyDay.zhText = res.data.data[0].zh_content;
                everyDay.enText = res.data.data[0].en_content;
                everyDay.author = res.data.data[0].author;
            }
        }).catch(function (err) {
            console.log(err);
        })
    }
})

var articleList = new Vue({
    el: "#article-list",
    data: {
        page: 1,
        pageSize: 4,
        count: 100,
        pageList: [],
        articleList: []
    },
    computed: {
        jumpTo: function () {
            return function (page) {
                this.getPage(page, this.pageSize)
            }
        },
        getPage: function () {
            return function (page, pageSize) {
                var params = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&"):"";
                var tag = "";
                for(var i = 0; i < params.length; i ++){
                    if(params[i].split("=")[0] == "tag"){
                        tag = params[i].split("=")[1];
                    }
                }
                if(tag == ""){  //按页查找
                    axios({
                        method: 'get',
                        url: '/queryBlogByPage?page=' + (page - 1) + '&pageSize=' + pageSize
                    }).then(function (res) { 
                        var data = res.data.data;
                        var list = [];
                        for (var i = 0; i < data.length; i++) {
                            var temp = {};
                            temp.title = data[i].title;
                            temp.date = data[i].ctime;
                            temp.views = data[i].views;
                            temp.tags = data[i].tags;
                            temp.id = data[i].id;
                            temp.link = "/blog_detail.html?bid=" + data[i].id;
                            temp.content = data[i].content;
                            list.push(temp); 
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (err) {
                        console.log(err)
                    });
                    axios({
                        mehtod: 'get',
                        url: "/queryBlogCount"
                    }).then(function (res) {
                        articleList.count = res.data.data[0].count;
                        articleList.generatePageTool;
                    })
                }else{
                    // 按标签查找
                    axios({
                        method: 'get',
                        url: "/queryBlogByTag?page="+(page-1)+"&pageSize="+pageSize+"&tag="+tag
                    }).then(res=>{
                        // console.log(res);
                        var data = res.data.data;
                        var list = [];
                        for (var i = 0; i < data.length; i++) {
                            var temp = {};
                            temp.title = data[i].title;
                            temp.date = data[i].ctime;
                            temp.views = data[i].views;
                            temp.tags = data[i].tags;
                            temp.id = data[i].id;
                            temp.link = "/blog_detail.html?bid=" + data[i].id;
                            temp.content = data[i].content;
                            list.push(temp); 
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    });
                    axios({
                        method: 'get',
                        url: '/queryCountTagBlog?tag='+tag
                    }).then(res=>{
                        // console.log(res);
                        articleList.count = res.data.data[0].count;
                        articleList.generatePageTool;
                    })
                }
            }
        },
        //分页函数，用户博客的分页
        generatePageTool() {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({ text: "<<", page: 1 });
            if (nowPage > 2) {
                result.push({ text: nowPage - 2, page: nowPage - 2 });
            }
            if (nowPage > 1) {
                result.push({ text: nowPage - 1, page: nowPage - 1 });
            }
            result.push({ text: nowPage, page: nowPage });
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({ text: nowPage + 1, page: nowPage + 1 });
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({ text: nowPage + 2, page: nowPage + 2 });
            }
            result.push({ text: ">>", page: parseInt((totalCount + pageSize - 1) / pageSize) });
            this.pageList = result;
            return result;
        }
    },
    created() {
        this.getPage(this.page, this.pageSize);

    }
})

var search = new Vue({
    el: '#search',
    data: {
        searchWord: '',
    },
    methods: {
        submitSearch(){
            var content = this.searchWord;
            axios({
                method: 'get',
                url: '/queryBlogByTitle?title='+content
            }).then(res=>{
                articleList.articleList = res.data.data
            })
        }
    }
})