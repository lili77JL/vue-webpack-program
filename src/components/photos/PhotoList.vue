<template>
    <div>
        <!--顶部的滑动条-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class=" mui-scroll">
                    <a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cates"
                       :key="item.id"
                       @click="getPhotoListByCateId(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <!--图片列表区域-->
        <div class="photo">
            <ul class="photo-list">
                <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
                    <img :src="item.img_url">
                    <div class="info">
                        <h1 class="info-title">{{item.title}}</h1>
                        <div class="info-body">{{item.zhaiyao}}</div>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    //导入mui的js文件
    import mui from '../../../lib/mui/js/mui.min.js'
    import axios from 'axios/dist/axios.min.js'

    export default {
        name: "PhotoList",
        data() {
            return {
                cates: [],
                list: []
            }
        },
        created() {
            this.getAllCategory()
            this.getPhotoListByCateId(0)
        },
        mounted() {
            //初始化滑动控件
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            getAllCategory() {
                axios.get('http://www.liulongbin.top:3005/api/getimgcategory').then(result => {
                    if (result.data.status === 0) {
                        result.data.message.unshift({title: '全部', id: 0})
                        this.cates = result.data.message
                        console.log(this.cates);
                    } else {
                        console.log('图片列表的分类信息获取失败');
                    }
                })
            },
            getPhotoListByCateId(cateID) {
                axios.get('http://www.liulongbin.top:3005/api/getimages/' + cateID).then(result => {
                    if (result.data.status == 0) {
                        this.list = result.data.message
                        console.log(this.list);
                    } else {
                        console.log('图片列表数据获取失败');
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .mui-segmented-control.mui-scroll-wrapper .mui-scroll {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .photo-list {
        list-style: none;
        padding-bottom: 0;
        width: 600px;
        margin: auto;
    }

    .photo-list li {
        margin-bottom: 10px;
        position: relative;
        width: 600px;
    }

    .photo-list li img {
        width: 600px;
        height: 500px;
    }

    .info {
        color: white;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .info-title {
        font-size: 14px;
    }

    .info-body {
        font-size: 13px;
    }
</style>