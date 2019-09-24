<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newslist/newsinfo/' +item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{item.add_time|dateFormat()}}</span>
                            <span>点击：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios/dist/axios.min.js'

    export default {
        name: "NewsList",
        created() {
            this.getNewsList()
        },
        data() {
            return {
                newsList: []
            }
        },
        methods: {
            getNewsList() {
                axios.get('http://www.liulongbin.top:3005/api/getnewslist').then(result => {
                    // console.log(result.data.message);
                    this.newsList = result.data.message
                })
            }
        }
    }
</script>

<style scoped>
    h1 {
        font-size: 16px;
    }

    .mui-ellipsis {
        font-size: 12px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
</style>