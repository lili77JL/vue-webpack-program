<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（最多不超过120字）" maxlength="120" v-model="msg">
        </textarea>
        <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="postComment">发表评论</button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content}}
                </div>
            </div>
        </div>
        <button type="button" class="mui-btn mui-btn-danger mui-btn-block mui-btn-outlined" @click="load">加载更多
        </button>
    </div>
</template>

<script>
    import axios from 'axios/dist/axios.min.js'

    export default {
        name: "comment",
        created() {
            this.getComments()
        },
        data() {
            return {
                pageindex: 1,
                comments: [],
                msg: null
            }
        },
        methods: {
            getComments() {
                axios.get('http://www.liulongbin.top:3005/api/getcomments/' + this.id + '?pageindex=' + this.pageindex).then(result => {
                    if (result.data.status === 0) {
                        console.log('评论获取成功');
                        console.log(result.data.message);
                        this.comments = this.comments.concat(result.data.message)
                    } else {
                        console.log('评论获取失败');
                    }
                })
            },
            postComment() {
                axios.post('http://www.liulongbin.top:3005/api/postcomment/' + this.id, {content: this.msg.trim()}).then(result => {
                    if (result.data.status === 0) {
                        var cmt = {
                            add_time: new Date(),
                            content: this.msg,
                            user_name: '匿名用户'
                        }
                        this.comments.unshift(cmt)
                        this.msg = null
                        console.log(result.data.message);
                    } else {
                        console.log('评论提交失败');
                    }
                })
            },
            load() {
                this.pageindex++
                this.getComments()
            }
        },
        props: ['id']
    }
</script>

<style scoped>
    h3 {
        font-size: 18px;
    }

    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }

    .cmt-list {
        margin: 5px 0;
    }

    .cmt-item {
        font-size: 13px;
    }

    .cmt-title {
        background-color: #ccc;
        line-height: 30px;
    }

    .cmt-body {
        line-height: 35px;
        text-indent: 2em;
    }
</style>