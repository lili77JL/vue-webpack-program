<template>
    <div class="goodsinfo-container">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" id="ball"></div>
        </transition>
        <!--商品轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotulist" :ishalf="ishalf"></swiper>
                </div>
            </div>
        </div>
        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:
                        <del>¥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now-price">¥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量：
                        <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
                    </p>
                    <p>
                        <el-button type="primary">立即购买</el-button>
                        <el-button type="danger" @click="addToShopCar">加入购物车</el-button>
                    </p>
                </div>
            </div>
        </div>
        <!--商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}}</p>
                    <p>上架时间：{{goodsinfo.add_time|dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <button type="button" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined"
                        @click="goDesc(id)">
                    图文介绍
                </button>
                <button type="button" class="mui-btn mui-btn-danger mui-btn-block mui-btn-outlined"
                        @click="goComment(id)">商品评论
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios/dist/axios.min.js'
    import swiper from '../subcomponents/swiper.vue'
    import numbox from '../subcomponents/goodsinfo-numbox.vue'

    export default {
        name: " GoodsInfo",
        created() {
            this.getLunbotu()
            this.getGoodsInfo()
        },
        data() {
            return {
                id: this.$route.params.id,
                lunbotulist: [],
                ishalf: true,
                goodsinfo: {},
                ballFlag: false,//控制小球隐藏和显示的标识符
                selectedCount: 1
            }
        }
        ,
        methods: {
            getLunbotu() {
                axios.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id).then(result => {
                    if (result.data.status == 0) {
                        console.log(result.data.message);
                        console.log('轮播图获取成功');
                        result.data.message.forEach(item => {
                            item.img = item.src
                        })
                        this.lunbotulist = result.data.message
                    } else {
                        console.log('轮播图获取失败');
                    }
                })
            },
            getGoodsInfo() {
                axios.get('http://www.liulongbin.top:3005/api/goods/getinfo/' + this.id).then(result => {
                    if (result.data.status == 0) {
                        console.log('获取商品参数成功');
                        this.goodsinfo = result.data.message[0]
                        console.log(this.goodsinfo);
                    } else {
                        console.log('获取商品参数失败');
                    }
                })
            },
            goDesc(id) {
                this.$router.push({name: 'goodsdesc', params: id})
            },
            goComment(id) {
                this.$router.push({name: 'goodscomment', params: id})
            },
            addToShopCar() {
                this.ballFlag = !this.ballFlag
                //拼接出商品信息对象，用于保存到store里面
                var goodsinfo = {
                    id: this.id,
                    count: this.selectedCount,
                    price: this.goodsinfo.sell_price,
                    selected: true
                }
                this.$store.commit('addToCar', goodsinfo)
                console.log(this.$store.state.car);
            },
            beforeEnter(el) {
                el.style.transform = 'translate(0,0)'
            },
            enter(el, done) {
                el.offsetWidth
                //获取小球在页面中的位置
                const ballPosition = document.getElementById('ball').getBoundingClientRect()
                //获取徽标在页面中的位置
                const badgePosition = document.getElementById('badge').getBoundingClientRect()
                const xDist = badgePosition.left - ballPosition.left
                const yDist = badgePosition.top - ballPosition.top
                el.style.transform = `translate(${xDist}px,${yDist}px)`
                el.style.transition = 'all 0.5s ease'
                done()

            },
            afterEnter(el) {
                this.ballFlag = !this.ballFlag
            },
            getSelectedCount(count) {
                this.selectedCount = count
                console.log(this.selectedCount);
            }
        },
        components: {
            swiper,
            numbox
        }
    }
</script>

<style lang="scss" scoped>
    .goodsinfo-container {
        background-color: #eee;

        .ball {
            width: 15px;
            height: 15px;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            z-index: 99;
            top: 581px;
            left: 148px;
        }
    }

    .price.now-price {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }

    .mui-card-footer {
        display: block;

        button {
            margin: 15px 0;
        }
    }


</style>