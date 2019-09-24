<template>
    <div>
        <el-container>
            <!--顶部header区域-->
            <el-header fixed>商城.vue项目</el-header>
            <!--中间main区域-->
            <transition>
                <router-view></router-view>
            </transition>
            <!--底部footer区域-->
            <nav class="mui-bar mui-bar-tab">
                <router-link class="mui-tab-item" to="/home">
                    <span class="mui-icon mui-icon-home"></span>
                    <span class="mui-tab-label">首页</span>
                </router-link>
                <router-link class="mui-tab-item" to="/member">
                    <span class="mui-icon mui-icon-contact"></span>
                    <span class="mui-tab-label">会员</span>
                </router-link>
                <router-link class="mui-tab-item" to="/shopcar">
                    <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                        <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
                    </span>
                    <span class="mui-tab-label">购物车</span>
                </router-link>
                <router-link class="mui-tab-item" to="/search">
                    <span class="mui-icon mui-icon-search"></span>
                    <span class="mui-tab-label">搜索</span>
                </router-link>
            </nav>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style scoped>
    .el-container {
        overflow-x: hidden;
        padding-top: 40px;
        padding-bottom: 50px;
    }

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
        font-size: 30px;
        box-sizing: border-box;
        flex-shrink: 0;
    }

    .v-enter {
        opacity: 0;
        transform: translateX(100%);
    }

    .v-leave-to {
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;
    }
</style>