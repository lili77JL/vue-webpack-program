<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time|dateFormat}}</span>
            <span>点击：{{photoinfo.click}}次</span>
        </p>
        <hr>
        <!--缩略图区域-->
        <div>
            <vue-preview :slides="photoList" class="imgPrev"></vue-preview>
        </div>
        <!--图片内容区域-->
        <div class="content" v-html="photoinfo.content">

        </div>
        <!--放置一个现成的评论子组件-->
        <comment :id="id"></comment>
    </div>
</template>

<script>
    import comment from '../subcomponents/comment.vue'
    import axios from 'axios/dist/axios.min.js'

    export default {
        name: "PhotoInfo",
        created() {
            this.getPhotoInfo()
            this.getPhotoList()
        },
        data() {
            return {
                id: this.$route.params.id,
                photoinfo: {},
                photoList: []
            }
        },
        methods: {
            getPhotoInfo() {
                axios.get('http://www.liulongbin.top:3005/api/getimageInfo/' + this.id).then(result => {
                        if (result.data.status == 0) {
                            console.log('图片详情获取成功');
                            this.photoinfo = result.data.message[0]
                        } else {
                            console.log('图片详情获取失败');
                        }
                    }
                )
            },
            getPhotoList() {
                axios.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id).then(result => {
                    if (result.data.status == 0) {
                        result.data.message.forEach(item => {
                            item.w = 600;   //设置以大图浏览时的宽度
                            item.h = 400;     //设置以大图浏览时的高度
                            item.msrc = item.src;
                        })
                        this.photoList = result.data.message
                        console.log(this.photoList);
                        console.log('获取略缩图数组成功');
                    } else {
                        console.log('获取略缩图数组失败');
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
    .photoinfo-container {
        padding: 3px;
    }

    .photoinfo-container h3 {
        color: #26A2FF;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }

    .subtitle {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }

    .content {
        font-size: 13px;
        line-height: 30px;
    }
</style>