<template>
    <div class="goodsdesc-container">
        <h3>{{goodsdesc.title}}</h3>
        <hr>
        <p v-html="goodsdesc.content"></p>
    </div>
</template>

<script>
    import axios from 'axios/dist/axios.min.js'

    export default {
        name: "GoodsDesc",
        created() {
            this.getGoodsDesc()
        },
        data() {
            return {
                id: this.$route.params.id,
                goodsdesc: {}
            }
        },
        methods: {
            getGoodsDesc() {
                axios.get('http://www.liulongbin.top:3005/api/goods/getdesc/' + this.id).then(result => {
                    if (result.data.status == 0) {
                        console.log('获取商品图文介绍成功');
                        this.goodsdesc = result.data.message[0]
                    } else {
                        console.log('获取商品图文介绍失败');
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goodsdesc-container {
        h3 {
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }
    }
</style>