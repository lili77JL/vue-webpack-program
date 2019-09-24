import Vue from 'vue';
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../lib/mui/css/mui.min.css';
import '../lib/mui/css/icons-extra.css'
import router from './router.js'
import App from './App.vue';
import VuePreview from 'vue-preview'

Vue.use(VuePreview)

Vue.use(VueRouter);
Vue.use(ElementUI);
import moment from 'moment'
import Vuex from 'vuex'

Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
    state: {//this.$store.state.属性名
        //专门存储数据的
        car: car,//一个购物车里有不同的商品，给每个商品设置一个对象
    },
    mutations: {//this.$store.commit('方法名',传递的唯一一个参数)
        addToCar(state, goodsinfo) {
            var flag = false
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = !flag
                    return true
                }
            })
            if (!flag) {
                state.car.push(goodsinfo)
            }
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            //当修改完商品的数量，把最新的数量保存到本地储存中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeCarList(state, id) {
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        addCarList(state, id) {

            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: {
        //this.$store.getters.方法名
        //负责对外提供数据，不负责修改数据
        getAllCount(state) {
            var c = 0
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getCountObj(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0,
                amount: 0
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += parseInt(item.count)
                    o.amount += parseInt(item.count * item.price)
                }
            })
            return o
        }
    }
})

Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})
new Vue({
    el: '#app',
    render: c => c(App),
    router,
    store//挂载
});