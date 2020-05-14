var tags = new Vue({
    el: "#tags",
    data: {
        tags: ["html", "css", "javaScript", "H5", "css3", "es6", "webpack", "git", "vue/vuex/vue-router", "设计模式", "小程序", "移动端", "node", "mySql"]
    },
    methods: {
        randomColor(){
            var r = Math.random() * 150 + 50;
            var g= Math.random() * 150 + 50;
            var b = Math.random() * 150 + 50;
            return `rgb(${r}, ${g}, ${b})`;
        },
        randomSize() {
            var size = (Math.random() * 20 + 12) + "px";
            return size;
        }
    },
    created(){
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then(res=>{
            // console.log(res);
            var tagsArr = [];
            for(var i = 0; i < res.data.data.length; i++){
                tagsArr.push({
                    text: res.data.data[i].tag,
                    link: "/?tag="+res.data.data[i].tag
                })
            }
            this.tags = tagsArr;
        })
    }
})

var hot = new Vue({
    el: "#hot",
    data: {
        list: []
    },
    created(){
        axios({
            method: 'get',
            url: '/queryHotBlog'
        }).then(res=>{
            // console.log(res);
            var hotList = [];
            var data = res.data.data;
            for(var i = 0; i < data.length; i++){
                hotList.push({
                    title: data[i].title,
                    link: 'blog_detail.html?bid='+data[i].id
                })
            }
            this.list = hotList;
        })
    }
})

var newComments = new Vue({
    el: '#new-comments',
    data: {
        comments: []
    },
    created(){
        axios({
            method: 'get',
            url: '/queryNewComments'
        }).then(res=>{
            console.log(res);
            var commentsList = [];
            var data = res.data.data;
            for(var i = 0; i < data.length; i++){
                commentsList.push({
                    name: data[i].username,
                    ctime: data[i].ctime,
                    content: data[i].comment
                })
            }
            this.comments = commentsList;
        })
    }
})