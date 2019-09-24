<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="getDtail(item.id)">
            <img :src="item.img_url">
            <h1 class="title">{{item.zhaiyao}}</h1>
            <div class="info">
                <p class="price">
                    <soan class="now">￥{{item.market_price}}</soan>
                    <span class="old">￥{{item.sell_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <button type="button" class="mui-btn mui-btn-danger mui-btn-block plain" @click="load"> 加载更多
        </button>
    </div>
</template>

<script>
    import axios from 'axios/dist/axios.min.js'

    export default {
        name: "GoodsList",
        created() {
            this.getGoodsList()
        },
        data() {
            return {
                pageindex: 1,
                goodslist: []
            }
        },
        methods: {
            getGoodsList() {
                axios.get('http://www.liulongbin.top:3005/api/getgoods?pageindex=' + this.pageindex
                ).then(result => {
                    if (result.data.status == 0) {
                        console.log('商品列表获取成功');
                        this.goodslist = this.goodslist.concat(result.data.message)
                    } else {
                        console.log('商品列表获取失败');
                    }
                })
            },
            load() {
                this.pageindex++
                this.getGoodsList()
            },
            getDtail(id) {
                this.$router.push('/home/goodsinfo/' + id)
            }
        }
    }
</script>

<style scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .goods-item {
        width: 33%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 7px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
    }

    img {
        width: 100%;
    }

    .title {
        font-size: 14px;
    }

    .info {
        background-color: #eee;
    }

    p {
        margin: 0;
        padding: 5px;
    }

    .now {
        color: red;
        font-weight: bold;
        font-size: 16px;
    }

    .old {
        text-decoration: line-through;
        font-size: 12px;
        margin-left: 10px;
    }

    .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
</style>