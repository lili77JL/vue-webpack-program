<template>
    <div class="shopcar-container">
        <div class="goods-list" v-for="(item,i) in goodslist" :key="item.thumb_path">
            <!--商品列表项区域-->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <el-switch
                                v-model="$store.getters.getGoodsSelected[item.id]"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
                        >
                        </el-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">¥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getCountObj[item.id]" :goodsid="item.id"></numbox>
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--结算区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价<span class="red">¥{{$store.getters.getGoodsCountAndAmount.amount}}</span>
                        </p>
                    </div>
                    <el-button type="danger">去结算</el-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import numbox from '../subcomponents/shopcar-numbox.vue'
    import axios from 'axios/dist/axios.min.js'

    export default {
        name: "ShopcarContainer",
        created() {
            this.getCarList()
            this.count()
        },
        data() {
            return {
                goodslist: []
            }
        },
        components: {
            numbox
        },
        methods: {
            getCarList() {
                //获取store中所有商品的id，并拼接出用逗号分隔的字符串
                var idArr = []
                this.$store.state.car.forEach(item => {
                    idArr.push(item.id)
                })
                //如果购物车里没有商品，则直接返回，不需要请求数据接口，否则会报错
                if (idArr.length == 0) {
                    return
                }
                axios.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/' + idArr.join(',')).then(result => {
                    if (result.data.status == 0) {
                        this.goodslist = result.data.message
                        // console.log(this.goodslist);
                        console.log('获取购物车页面数据成功');
                    } else {
                        console.log('获取购物车页面数据失败');
                    }
                })
            },
            remove(id, index) {
                this.$store.commit('removeCarList', id)
                this.goodslist.splice(index, 1)
            },
            selectedChanged(id, value) {
                this.$store.commit('updateGoodsSelected', {id, selected: value})
                console.log(id + '=======' + value)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .shopcar-container {
        background-color: #eee;
        overflow: hidden;

        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .red {
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }

        .goods-list {
            .mui-card-content-inner {
                display: flex;
                align-items: center;
            }

            img {
                width: 60px;
                height: 60px;
            }

            h1 {
                font-size: 14px;
            }

            .info {
                .price {
                    color: red;
                    font-weight: bold;
                }
            }

            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
        }
    }

</style>