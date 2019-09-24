<template>
    <div>
        <!--大标题-->
        <h3 class="title">新闻标题</h3>
        <!--子标题-->
        <p class="subtitle">
            <span>发表时间：{{newsinfo.add_time|dateFormat}}</span>
            <span>点击：{{newsinfo.click}}次</span>
        </p>
        <!--横线-->
        <hr>
        <div class="content" v-html="newsinfo.content"></div>
        <!--评论区域-->
        <comment :id="id"></comment>
    </div>
</template>

<script>
    import axios from 'axios/dist/axios.min.js'
    import comment from '../subcomponents/comment.vue'

    export default {
        name: "NewsInfo",
        created() {
            this.getNewsInfo()
        },
        data() {
            return {
                //将URL地址中传递过来的Id值，挂载到data上，方便以后调用
                id: this.$route.params.id,
                newsinfo: {}
            }
        },
        methods: {
            getNewsInfo() {
                axios.get('http://www.liulongbin.top:3005/api/getnew' + this.id).then(result => {
                    if (result.data.status === 0) {
                        this.newsinfo = result.data.message[0]
                        console.log('获取文本图文资讯详情成功');
                        console.log(result.data.message);
                    } else {
                        console.log('获取文本图文资讯详情失败');
                    }
                })
            }
        },
        components: {
            comment
        }
    }
</script>

<style scoped>
    .title {
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }

    .subtitle {
        font-size: 13px;
        color: blue;
        display: flex;
        justify-content: space-between;
    }
</style>