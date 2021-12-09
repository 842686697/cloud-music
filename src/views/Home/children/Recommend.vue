<template>
    <div id="recommend">
        <div class="swiper_backbox">
            <div class="swiper_box">
                <div class="swiper">
                <el-carousel ref="banner" @change="bannerChange" v-loading="!banners.length" :interval="5000" arrow="never" height="283px">
                    <el-carousel-item v-for="(item,index) in banners" :key="index">
                        <h3>
                            <img :src='item.imageUrl' height="283">
                        </h3>
                    </el-carousel-item>
                </el-carousel>
                </div>
                <div class="download_box">
                    <router-link to="/download" class="download_button"></router-link>
                    <div class="download_text">PC 安卓 iPhone WP iPad Mac 六大客户端</div>
                </div>
                <img :src="banners[banner_now].imageUrl" class="swiper_back" />
                <div @click="bannerPrev()" class="swiper_left"><i class="iconfont icon-115fangxiang_xiangzuo"></i></div>
                <div @click="bannerNext()" class="swiper_right"><i class="iconfont icon-113fangxiang_xiangyou"></i></div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "recommend",
        data(){
            return{
                banners:[],
                banner_now:0
            }
        },
        created() {
            this.dataInit();
        },
        mounted() {

        },
        methods:{
            //获取首页数据
            dataInit(){
                axios.get(this.common.defaultUrl+'home/recommend').then(res=>{
                    console.log('获取轮播图：',res.data);
                    this.banners=res.data.body.banners
                })
            },
            bannerChange(to,from){
                this.banner_now=to;
            },
            bannerPrev(){
                this.$refs.banner.prev()
            },
            bannerNext(){
                this.$refs.banner.next()
            }
        }
    }
</script>

<style scoped>

    .swiper_backbox{
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 283px;
        overflow: hidden;
    }
    .swiper_box{
        display: flex;
        width: 982px;
        height: 100%;
    }
    .swiper{
        position: relative;
        z-index: 1;
        width: 730px;

    }
    .swiper_back{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        filter: blur(60px);
    }
    .swiper_left{
        position: absolute;
        left: 200px;
        top: 120px;
        opacity: 0.8;
        padding: 5px 0;
     }
    .swiper_left .iconfont{
        font-size: 40px;
        color: lightgray;
    }
    .swiper_left:hover{
        cursor: pointer;
        background-color: #717171;
    }
    .swiper_right{
        position: absolute;
        right: 200px;
        top: 120px;
        opacity: 0.8;
        padding: 5px 0;
    }
    .swiper_right .iconfont{
        font-size: 40px;
        color: lightgray;
    }
    .swiper_right:hover{
        cursor: pointer;
        background-color: #717171;

    }
    .download_box{
        position: relative;
        z-index: 1;
        height: 283px;
        width: 254px;
        background: url("../../../../public/img/download.png");
        box-shadow: 6px 0px 5px -5px #5d5d5d,-6px 0px 5px -5px #5d5d5d;
    }
    .download_button{
        position: absolute;
        left: 19px;
        top: 186px;
        width: 215px;
        height: 56px;
        background-color: #868686;
        opacity: 0;
    }
    .download_button:hover{
        opacity: 0.3;
        cursor: pointer;
    }
    .download_text{
        position: absolute;
        left: 10px;
        top: 256px;
        color: gray;
        font-size: 11px;
     }
    .el-carousel__item h3 {
        height: 100%;
        background-color: #c10c0c;
        font-size: 18px;
        margin: 0;
        padding: 0;
    }

</style>