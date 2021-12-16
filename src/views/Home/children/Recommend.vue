<template>
    <div id="recommend">
        <div class="swiper_backbox">
            <div class="swiper_box">
                <div class="swiper">
                <el-carousel ref="banner" @change="bannerChange" v-loading="!banners.length" :interval="5000" arrow="never" height="283px">
                    <el-carousel-item v-for="(item,index) in banners" :key="index">
                        <h3>
                            <img :src='item.imageUrl' height="283" width="730">
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
        <main class="main_back">
            <div class="main_box">
                <div class="main_left">
                    <!--                    热门推荐-->
                    <div class="block_box">
                        <div class="block_header">
                            <div class="block_icon"><div class="block_icon_white"></div></div>
                            <div class="block_name"> 热门推荐</div>
                            <div class="block_tags">
                                <div class="block_tags_text">华语</div>
                                <span>|</span>
                                <div class="block_tags_text">流行</div>
                                <span>|</span>
                                <div class="block_tags_text">摇滚</div>
                                <span>|</span>
                                <div class="block_tags_text">民谣</div>
                                <span>|</span>
                                <div class="block_tags_text">电子</div>
                            </div>
                        </div>
                        <div class="hot_box">
                            <div class="hot_playlist" v-for="(item,index) in hotList" :key="index">
                                <div class="playlist_img" @click="toPlaylist(item.id)">
                                    <img :src="item.coverImgUrl" height="140px" width="140px" />
                                    <div class="playlist_img_icon">
                                        <i class="iconfont icon-erji"></i>
                                        <div class="playlist_playcount">{{item.playCount%10000>1?parseInt(item.playCount/10000)+'万':item.playCount}}</div>
                                        <i class="iconfont icon-yunhang"></i>
                                    </div>
                                </div>
                                <div class="playlist_title" @click="toPlaylist(item.id)">{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                    <!--                    新碟-->
                    <div class="block_box">
                        <div class="block_header">
                            <div class="block_icon"><div class="block_icon_white"></div></div>
                            <div class="block_name">新碟上架</div>
                        </div>
                        <div class="album_banner_box">
                            <el-carousel ref="album" :autoplay=false arrow="never" indicator-position="none">
                                <el-carousel-item v-for="(item,index) in newAlbum" :key="index">
                                    <div class="album_banner">
                                        <div class="album_box">
                                            <div class="album_img_box">
                                                <img :src="item[0].coverUrl" width="100" height="100">
                                                <div class="album_img_back"></div>
                                            </div>
                                            <div class="album_info_box">
                                                <div class="album_info_name">{{item[0].albumName}}</div>
                                                <div class="album_info_artist">{{item[0].artistName}}</div>
                                            </div>
                                        </div>
                                        <div class="album_box">
                                            <div class="album_img_box">
                                                <img :src="item[1].coverUrl" width="100" height="100">
                                                <div class="album_img_back"></div>
                                            </div>
                                            <div class="album_info_box">
                                                <div class="album_info_name">{{item[1].albumName}}</div>
                                                <div class="album_info_artist">{{item[1].artistName}}</div>
                                            </div>
                                        </div>
                                        <div class="album_box">
                                            <div class="album_img_box">
                                                <img :src="item[2].coverUrl" width="100" height="100">
                                                <div class="album_img_back"></div>
                                            </div>
                                            <div class="album_info_box">
                                                <div class="album_info_name">{{item[2].albumName}}</div>
                                                <div class="album_info_artist">{{item[2].artistName}}</div>
                                            </div>
                                        </div>
                                        <div class="album_box">
                                            <div class="album_img_box">
                                                <img :src="item[3].coverUrl" width="100" height="100">
                                                <div class="album_img_back"></div>
                                            </div>
                                            <div class="album_info_box">
                                                <div class="album_info_name">{{item[3].albumName}}</div>
                                                <div class="album_info_artist">{{item[3].artistName}}</div>
                                            </div>
                                        </div>
                                        <div class="album_box">
                                            <div class="album_img_box">
                                                <img :src="item[4].coverUrl" width="100" height="100">
                                                <div class="album_img_back"></div>
                                            </div>
                                            <div class="album_info_box">
                                                <div class="album_info_name">{{item[4].albumName}}</div>
                                                <div class="album_info_artist">{{item[4].artistName}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </el-carousel-item>
                            </el-carousel>
                            <i class="iconfont icon-115fangxiang_xiangzuo album_banner_left" @click="albumLeft()"></i>
                            <i class="iconfont icon-113fangxiang_xiangyou album_banner_right" @click="albumRight()"></i>

                        </div>
                    </div>
                    <!--                    榜单-->
                    <div class="block_box">
                        <div class="block_header">
                            <div class="block_icon"><div class="block_icon_white"></div></div>
                            <div class="block_name">榜单</div>
                        </div>
                        <div class="toplist_box">
                            <div class="toplist_left">
                                <div class="toplist_header">
                                    <img src="../../../../public/img/biaosheng.jpg" width="80" height="80" class="toplist_header_img"/>
                                    <div class="toplist_header_info_box">
                                        <div class="toplist_header_info_name">飙升榜</div>
                                        <div class="toplist_header_info_icon">
                                            <i class="iconfont icon-yunhang toplist_header_info_icon_play"></i>
                                            <i class="iconfont icon-wenjianjia toplist_header_info_icon_collect"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="toplist_lists">
                                    <div class="toplist_song" :class="{'toplist_song_back':!(index%2>0)}" v-for="(item,index) in topListLeft" :key="index">
                                        <div class="toplist_song_index" :class="{'_red':index<3}">{{index+1}}</div>
                                        <div class="toplist_song_name" :id="item.id" @click="toSong($event)">{{item.name}}</div>
                                    </div>
                                    <div class="toplist_song_bottom">查看全部></div>
                                </div>
                            </div>
                            <div class="toplist_center">
                                <div class="toplist_header">
                                    <img src="../../../../public/img/xinge.jpg" width="80" height="80" class="toplist_header_img"/>
                                    <div class="toplist_header_info_box">
                                        <div class="toplist_header_info_name">新歌榜</div>
                                        <div class="toplist_header_info_icon">
                                            <i class="iconfont icon-yunhang toplist_header_info_icon_play"></i>
                                            <i class="iconfont icon-wenjianjia toplist_header_info_icon_collect"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="toplist_lists">
                                    <div class="toplist_song" :class="{'toplist_song_back':!(index%2>0)}" v-for="(item,index) in topListCenter" :key="index">
                                        <div class="toplist_song_index" :class="{'_red':index<3}">{{index+1}}</div>
                                        <div class="toplist_song_name" :id="item.id" @click="toSong($event)">{{item.name}}</div>
                                    </div>
                                    <div class="toplist_song_bottom">查看全部></div>
                                </div>
                            </div>
                            <div class="toplist_right">
                                <div class="toplist_header">
                                    <img src="../../../../public/img/yuanchuang.jpg" width="80" height="80" class="toplist_header_img"/>
                                    <div class="toplist_header_info_box">
                                        <div class="toplist_header_info_name">原创榜</div>
                                        <div class="toplist_header_info_icon">
                                            <i class="iconfont icon-yunhang toplist_header_info_icon_play"></i>
                                            <i class="iconfont icon-wenjianjia toplist_header_info_icon_collect"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="toplist_lists">
                                    <div class="toplist_song" :class="{'toplist_song_back':!(index%2>0)}" v-for="(item,index) in topListRight" :key="index">
                                        <div class="toplist_song_index" :class="{'_red':index<3}">{{index+1}}</div>
                                        <div class="toplist_song_name" :id="item.id" @click="toSong($event)">{{item.name}}</div>
                                    </div>
                                    <div class="toplist_song_bottom">查看全部></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_right">
                    <div class="login_box">
                        <div class="login_title">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</div>
                        <div class="login_button">用户登录</div>
                    </div>
                    <div class="artist_box">
                        <div class="artist_header">
                            <div class="artist_header_left">入住歌手</div>
                            <div class="artist_header_right">查看全部 ></div>
                        </div>
                        <div class="artist_lists">
                            <div class="artist_info_box" v-for="(item,index) in topArtists">
                                <img :src="item.img1v1Url" height="62" width="62"/>
                                <div class="artist_info">
                                    <div class="artist_info_top" :id="item.id">{{item.name}}</div>
                                    <div class="artist_info_bottom">{{item.alias[0]}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="artist_button">申请成为网易音乐人</div>
                    </div>
                    <div></div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "recommend",
        data(){
            return{
                banners:[],
                banner_now:0,
                hotList:[],
                newAlbum:[],
                topListLeft:[],
                topListCenter:[],
                topListRight:[],
                topArtists:[]
            }
        },
        created() {
            this.getBanner();
            this.getHot();
            this.getNewAlbum();
            this.getTopListLeft();
            this.getTopListCenter();
            this.getTopListRight();
            this.getTopArtists();
            this.test();
        },
        mounted() {

        },
        methods:{
            //获取首页数据
            getBanner(){
                axios.get(this.common.defaultUrl+'home/banner').then(res=>{
                    console.log('banner：',res.data);
                    this.banners=res.data.body.banners
                })
            },
            bannerChange(to,from){
                this.banner_now=to;
            },
            //轮播图前翻
            bannerPrev(){
                this.$refs.banner.prev()
            },
            //轮播图后翻
            bannerNext(){
                this.$refs.banner.next()
            },
            //新专辑前翻
            albumLeft(){
                this.$refs.album.prev();
            },
            //新专辑后翻
            albumRight(){
                this.$refs.album.next();
            },
            //获取热门歌单推荐
            getHot(){
                axios.get(this.common.defaultUrl+'home/hot').then(res=>{
                    console.log('hotlist:',res.data)
                    this.hotList=res.data.playlists;
                })
            },
            //获取新碟上架
            getNewAlbum(){
                axios.get(this.common.defaultUrl+'home/newAlbum').then(res=>{
                    console.log('newAlbum:',res.data);
                    let albums=[[],[]];
                    albums[0]=res.data.products.slice(0,5);
                    albums[1]=res.data.products.slice(5,10);
                    this.newAlbum=albums;
                })
            },
            //获取飙升榜left数据
            getTopListLeft(){
                axios.get(this.common.defaultUrl+'home/topListLeft').then(res=>{
                    console.log('topListLeft:',res.data);
                    this.topListLeft=res.data.playlist.tracks.slice(0,10);
                })
            },
            getTopListCenter(){
                axios.get(this.common.defaultUrl+'home/topListCenter').then(res=>{
                    console.log('topListCenter',res.data);
                    this.topListCenter=res.data.playlist.tracks.slice(0,10);
                })
            },
            getTopListRight(){
                axios.get(this.common.defaultUrl+'home/topListRight').then(res=>{
                    console.log('topListRight',res.data);
                    this.topListRight=res.data.playlist.tracks.slice(0,10);
                })
            },
            //获取热门歌手排行（代替入驻歌手）
            getTopArtists(){
                axios.get(this.common.defaultUrl+'home/topArtists').then(res=>{
                    console.log('topArtists',res.data);
                    this.topArtists=res.data.artists;
                })
            },
            toPlaylist(id){
                this.$router.push({name:'Playlist',params:{
                        id:id
                    }})
            },
            toSong(e){
                const id=e.currentTarget.id;
                this.$router.push({name:'Song',params:{
                    id:id
                }})
            },
            test(){
                axios.get(this.common.defaultUrl+'test').then(res=>{
                    console.log('test:',res.data)
                })
            }
        }
    }
</script>

<style scoped>
    .swiper_backbox{
        position: relative;
        display: flex;
        justify-content: center;
        width:1519px;
        height: 283px;
        overflow: hidden;
        font-size: 12px;
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
    .main_back{
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }
    .main_box{
        display: flex;
        width:982px;
        height: 1380px;
        background-color: white;
        border-left: 1px #c2c2c2 solid;
        border-right: 1px #c2c2c2 solid;
    }
    .main_left{
        width: 729px;
    }
    .main_right{
        border-left: 2px solid #e2e2e2;
        width: 250px;
        box-sizing: border-box;
    }
    .login_box{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 250px;
        height: 126px;
        line-height: 20px;
        padding: 10px 20px ;
        box-sizing: border-box;
        background: url("../../../../public/img/index.png");
    }
    .login_title{
        font-size: 12px;
        color: #636363;
    }
    .login_button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 30px;
        border-radius: 5px;
        font-size: 12px;
        color: white;
        background:url("../../../../public/img/index.png")0 -195px;
    }
    .login_button:hover{
        cursor: pointer;
        background:url("../../../../public/img/index.png")-110px -195px;
    }
    .artist_box{
        padding: 20px;
        box-sizing: border-box;
    }
    .artist_header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom:5px;
        width: 210px;
        border-bottom: 1px solid lightgray;
    }
    .artist_header_left{
        color: black;
        font-size: 12px;
        font-weight: bold;
    }
    .artist_header_right{
        color: #636363;
        font-size: 12px;
    }
    .artist_box{
    }
    .artist_lists{
        padding-top: 10px;
    }
    .artist_info_box{
        display: flex;
        height: 62px;
        width: 210px;
        box-sizing: border-box;
        margin-top: 14px;
        background-color: #f9f9f9;
        border:1px solid #e0e0e0;
    }
    .artist_info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding:6px 15px;
        box-sizing: border-box;
    }
    .artist_info_top{
        font-size: 14px;
        font-weight: bolder;
    }
    .artist_info_bottom{
        font-size: 12px;
        color: gray;
    }
    .artist_button{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 31px;
        width: 210px;
        margin-top: 15px;
        font-size: 12px;
        font-weight: bold;
        background-color: #f1f1f1;
        border:1px solid #e0e0e0;
        border-radius: 5px;
    }
    .artist_button:hover{
        cursor: pointer;
        background-color: white;
    }
    .block_box{
        padding: 20px;
    }
    .block_icon{
        position: relative;
        background-color: #C10D0C;
        border-radius: 50%;
        width: 14px;
        height:14px ;
        margin:0 10px;
    }
    .block_icon_white{
        position: absolute;
        left: 4px;
        top: 4px;
        background-color: white;
        border-radius: 50%;
        width: 6px;
        height:6px;
    }
    .block_header{
        display: flex;
        justify-content: left;
        align-items: center;
        border-bottom: 2px #C10D0C solid;
        padding-bottom: 5px;
        margin-bottom:20px;
    }
    .block_name{
        font-size: 20px;
    }
    .block_tags{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
    }
    .block_tags_text{
        font-size: 12px;
        color: #666;
    }
    .block_tags_text:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    .block_tags span{
        margin: 0 10px;
        color: #ccc;
        font-size: 11px;
    }
    .hot_box{
        display: grid;
        grid-template-rows: repeat(2,50%);
        grid-template-columns: repeat(4,140px);
        grid-column-gap: 43px;
        grid-row-gap: 30px;
    }
    .hot_playlist{
        height: 204px;

    }
    .playlist_img{
        position: relative;
        left: 0;
        top: 0;
        height: 140px;
    }
    .playlist_img:hover{
        cursor: pointer;
    }
    .playlist_title{
        box-sizing: border-box;
        margin-top: 8px;
        font-size: 14px;
    }
    .playlist_title:hover{
        cursor: pointer;
        text-decoration: underline;
    }
    .playlist_img_icon{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        bottom: 0;
        height: 25px;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        border-top: 1px black solid;
        color: lightgray;
        font-size: 12px;
        background-color: #24000d;
        background-color: rgba(0, 0, 0, 0.6)
    }
    .playlist_img_icon :first-child{
        font-size: 12px;
    }
    .playlist_playcount{
        position: absolute;
        left: 28px;
    }
    .playlist_img_icon :nth-child(3){

    }
    .album_banner_box{
        overflow: hidden;
        position: relative;
        left: 0;
        top: 0;
        border:1px solid rgb(211, 211, 211);
        background: rgb(245, 245, 245);
        height: 188px;
        box-sizing: border-box;
        padding:0 20px;
    }
    .album_banner{
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        padding-top: 30px;
        height: 188px;
        width: 645px;
    }
    .album_box{
        height: 150px;
        width: 118px;
    }
    .album_img_box{
        position: relative;
    }
    .album_img_back{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100px;
        background: url("../../../../public/img/coverall.png") 0 -570px;
    }
    .album_banner_left{
        position: absolute;
        left: 3px;
        top:84px;
        color: #929292;
    }
    .album_banner_left:hover{
        color: #21000b;
        cursor: pointer;
    }
    .album_banner_right{
        position: absolute;
        right: 3px;
        top: 84px;
        color: #929292;
    }
    .album_banner_right:hover{
        color: #21000b;
        cursor: pointer;
    }
    .album_info_box{

    }
    .album_info_name{
        height: 18px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size:12px;
    }
    .album_info_name:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    .album_info_artist{
        margin-top: 3px;
        font-size: 12px;
        color: #666;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .toplist_box{
        display: flex;
        width: 100%;
        height: 472px;
        background-color: #f4f4f4;
    }
    .toplist_left{

    }
    .toplist_header{
        display: flex;
        width: 230px;
        height: 120px;
        padding: 20px;
        box-sizing: border-box;
    }
    .toplist_header_img{

    }
    .toplist_header_info_box{
        padding: 5px 10px;
        box-sizing: border-box;
    }
    .toplist_header_info_icon{
        display: flex;
        align-items: center;
        padding: 5px 0;
        box-sizing: border-box;
    }
    .toplist_header_info_icon_play{
        margin-right: 5px;
        font-size: 25px;
        color: #a7a7a7;
    }
    .toplist_header_info_icon_collect{
        font-size: 25px;
        color: #a7a7a7;
    }
    .toplist_lists{

    }
    .toplist_song{
        display: flex;
        align-items: center;
        width: 230px;
        height: 32px;
        padding-left: 30px;
        box-sizing:border-box;
    }
    .toplist_song_back{
        background-color: #e7e7e7;
    }
    .toplist_song_bottom{
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        padding-right: 30px;
        width: 230px;
        height:32px;
        box-sizing: border-box;
        font-size: 12px;
        background-color: #e7e7e7;
    }
    .toplist_song_index{
        font-size: 16px;
        margin-right: 15px;
        color: #7b6a66;
    }
    ._red{
        color: red;
    }
    .toplist_song_name{
        font-size: 12px;
    }
    .toplist_song_name:hover{
        cursor: pointer;
        text-decoration: underline;
    }
</style>