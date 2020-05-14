var blogDetail = new Vue({
    el: "#blog_detail",
    data: {
        title: "",
        content: "",
        ctime: "",
        tags: "",
        view: ""
    },
    computed: {

    },
    created() {
        var params = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (params == "") {
            return;
        }
        var bid = -1;
        for (var i = 0; i < params.length; i++) {
            if (params[i].split("=")[0] == "bid") {
                try {
                    bid = params[i].split("=")[1];
                } catch (error) {
                    console.log(error);
                }
            }
        }

        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid,
        }).then(function (res) {
            console.log(res);
            var data = res.data.data[0];
            blogDetail.title = data.title;
            blogDetail.view = data.view;
            blogDetail.tags = data.tags;
            blogDetail.content = data.content;
            blogDetail.ctime = data.ctime;
        }).catch(function (err) {
            console.log(err);

        })
    }
})

var sendComments = new Vue({
    el: "#send_comment",
    data: {
        vcode: "",
        rightCode: ""
    },
    computed: {
        changeCode(){
            return function(){
                axios({
                    method: 'get',
                    url: "/queryRandomCode"
                }).then(function(res){
                    // console.log(res);
                    sendComments.vcode = res.data.data.data;
                    sendComments.rightCode = res.data.data.text;
                }).catch(function(err){
                    console.log(err);
                })
            }
        },
        sendComment() {
            return function () {
                var code = document.getElementById("comment_code");
                if(code.value != sendComments.rightCode){
                    alert('验证码错误');
                    sendComments.changeCode();
                    code.value = "";
                    return;
                }

                var params = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                if (params == "") {
                    return;
                }
                var bid = -1;
                for (var i = 0; i < params.length; i++) {
                    if (params[i].split("=")[0] == "bid") {
                        try {
                            bid = params[i].split("=")[1];
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }

                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;

                if([reply, name, email, content].includes("")){
                    alert("请先填写完整信息")
                    return;
                }
                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&reply=" + reply + "&replyName=" + replyName + "&userName=" + name + "&email=" + email + "&content=" + content
                }).then(function (res) {
                    // console.log(res);

                }).catch(function (err) {
                    console.log(err);

                })
            }
        }
    },
    created() {
        this.changeCode();
    }
})

var blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        comments: []
    },
    computed: {
        reply(){
            return function(commentId,userName){
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comment";
            }
        }
    },
    created(){
        var params = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (params == "") {
            return;
        }
        var bid = -1;
        for (var i = 0; i < params.length; i++) {
            if (params[i].split("=")[0] == "bid") {
                try {
                    bid = params[i].split("=")[1];
                } catch (error) {
                    console.log(error);
                }
            }
        }
        axios({
            method: 'get',
            url: '/queryCommentsByBlogId?bid='+bid
        }).then((res)=>{
            // console.log(res);
            this.comments = res.data.data;
            for(var i = 0; i < this.comments.length; i++){
                if(this.comments[i].reply > -1){
                    this.comments[i].options = "回复@" + this.comments[i].reply_name;
                }
            }
        }).catch(err=>{
            console.log(err);   
        });
        
        //获取当前文章评论总数
        axios({
            method: 'get',
            url: '/queryCommentsCountByBlogId?bid='+bid
        }).then(res=>{
            // console.log(res);
            this.total = res.data.data[0].count;
        })
    }
})