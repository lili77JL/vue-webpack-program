<template>
    <div>
        <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in lunbotuList" :key="item.img">
                <img :src="item.img" alt="" :class="ishalf?'half':''">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: "swiper",
        props: ['lunbotuList', 'ishalf'],
    }
</script>

<style scoped>
    .el-carousel__item {
        text-align: center;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    img {
        width: 100%;
        height: 100%;
    }

    .half {
        width: 30%;
    }

</style>