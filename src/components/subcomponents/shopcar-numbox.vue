<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='max' style="height: 25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" @change="countChanged" ref="numbox" :value="initcount"
               readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../../lib/mui/js/mui.min.js'

    export default {
        name: "goodsinfo-numbox",
        mounted() {
            mui('.mui-numbox').numbox()
        },
        methods: {
            //每当文本框的数据被修改的时候，立即把最新的数据，通过事件调用，传递给父组件
            countChanged() {
                this.$store.commit('updateGoodsInfo',
                    {
                        id: this.goodsid,
                        count: this.$refs.numbox.value
                    })
            },
        },
        props: ['initcount', 'goodsid']
    }
</script>

<style scoped>

</style>