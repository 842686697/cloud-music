<template>
    <div class="album" :class="{'album_loading':songs.length===0}">
        <div class="song_left">
            <div class="info">
                <div class="song_left_img_box">
                    <img :src="album.picUrl?album.picUrl:''" class="song_left_img" width="177px" height="177px"/>
                    <div class="song_left_img_back"></div>
                </div>
                <div class="song_left_text">
                    <div class="song_left_title">
                        <div class="song_left_type"></div>
                        <div class="song_left_name">{{album.name}}</div>
                    </div>
                    <div class="song_left_info">
                        <div class="song_left_artist">
                            <div>歌手：</div>
                            <div v-for="(item,index) in album.artists">
                                <a href="" class="artist_to">{{item.name}}</a><span v-if="index+1!==album.artists.length">&nbsp/&nbsp</span>
                            </div>
                        </div>
                        <div class="publish">发行时间：{{getPublishTime()}}</div>
                        <div class="publish">发行公司：{{album.company}}</div>
                    </div>
                    <div class="song_left_buttons" @click="playSong()">
                        <div class="button_play">
                            <div class="play_icon"></div>
                            <div class="play_text">播放</div>
                        </div>
                        <div class="button_add" >
                        </div>
                        <div class="button_collect"></div>
                        <div class="button_share"></div>
                        <div class="button_download"></div>
                        <div class="button_comment"></div>
                    </div>
                </div>
            </div>
            <div class="introduce">
                <div class="song_left_lyric" :class="{'song_left_lyric_open':isOpen}">
                    <div class="description_title">专辑介绍：</div>
                    <div class="description_text" v-for="(item,index) in getDescription()">{{item}}</div>
                </div>
                <div class="open_button_box">
                    <div v-if="!isOpen" class="open_button" @click="lyricOpen()">展开↓</div>
                    <div v-else class="open_button" @click="lyricOpen()">收起↑</div>
                </div>
            </div>
            <div class="left_bottom">
                <div class="playlist_header">
                    <div class="playlist_header_name">包含歌曲列表</div>
                    <div class="playlist_header_mount">{{songs.length}}首歌</div>

                </div>
                <div class="list_songs">
                    <div class="songs_sort">
                        <div class="sort_index"></div>
                        <div class="sort_name">歌曲标题</div>
                        <div class="sort_time">时长</div>
                        <div class="sort_artist">歌手</div>
                    </div>
                    <el-skeleton variant="p" style="width: 100%" :loading="!songs.length"  animated />
                    <div  class="song" :class="{'song_last':index+1===songs.length}" v-for="(item,index) in songs">
                        <div class="song_index">{{index+1}}</div>
                        <i class="iconfont icon-yunhang song_play" @click="playSong()"></i>
                        <div class="song_name">{{item.name}}</div>
                        <div class="song_time"></div>
                        <div class="song_artist">{{item.ar[0].name}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="song_right"></div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Album",
        data(){
            return{
                id:Number,
                isOpen:false,
                album:{},
                songs:[]
            }
        },
        methods:{
            //播放已有歌曲
            playSong(){
                this.$alert('因为版权等原因，专辑内歌曲不能播放', '不能播放的歌曲', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                });
            },
            //转换发行时间
            getPublishTime(){
                let data=new Date(this.album.publishTime);
                return data.toLocaleString()
            },
            lyricOpen(){
                this.isOpen=!this.isOpen;
            },
            //获取现在播放歌曲的id
            getNowId(){
                return this.$store.getters.getNowId;
            },
            getId(){
                this.id=this.$route.params.id;
            },
            getDescription(){
                return this.album.description.split('\n');
            },
            getAlbumInfo(){
                axios.get(this.common.defaultUrl+'album',{
                    params:{
                        id:this.id
                    }
                }).then(res=>{
                    console.log('album:',res.data);
                    this.album=res.data.album;
                    this.songs=res.data.songs;
                })
            },
            test(){
                axios.get(this.common.defaultUrl+'test').then(res=>{
                    console.log('test:',res.data)
                })
            }
        },
        created() {
            this.getId();
            // setTimeout(this.getAlbumInfo,3000)
            this.getAlbumInfo();
        }
    }
</script>

<style scoped>
    .album{
        width: 980px;
        border-left: 1px #c2c2c2 solid;
        border-right: 1px #c2c2c2 solid;
        background-color: white;
    }
    .album_loading{
        height: 500px;
    }
    .song_left{
        display: flex;
        flex-direction: column;
        width: 709px;
        box-sizing: border-box;
        padding:45px 35px;
        border-right: 1px solid #dbdbdb;
    }
    .info{
        display: flex;
        width: 709px;
    }
    .song_left_img_box{
        position: relative;
        margin-right: 38px;
    }
    .song_left_img_back{
        position: absolute;
        left: 0;
        top: 0;
        width: 209px;
        height: 177px;
        background: url("../../public/img/coverall.png") 0 -986px;
    }
    .song_left_text{
        width: 100%;
        margin-left: 20px;
    }
    .song_left_title{
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    .song_left_type{
        width: 54px;
        height: 24px;
        background: url("../../public/img/icon.png") 0 -186px;
    }
    .song_left_name{
        margin-left: 10px;
        font-size: 20px;
    }
    .artist_to{
        color: #0c73c2;
    }
    .artist_to:hover{
        text-decoration: underline;
    }
    .song_left_info{
        font-size: 12px;
    }
    .song_left_artist{
        display: flex;
        color: #666;
    }
    .publish{
        margin-top: 5px;
        color: #666;
    }
    .song_left_buttons{
        display: flex;
        margin-top: 20px;
    }
    .button_play{
        display: flex;
        align-items: center;
        width: 66px;
        height: 31px;
        padding-left: 8px;
        box-sizing: border-box;
        background: url("../../public/img/button2.png") 0 -387px;
    }
    .button_play:hover{
        cursor: pointer;
        background: url("../../public/img/button2.png") 0 -469px;
    }
    .button_play:active{
        background: url("../../public/img/button2.png") 0 -551px;
    }
    .button_play:hover .play_icon{
        background: url("../../public/img/button2.png") -28px -1622px;
    }
    .button_play:active .play_icon{
        background: url("../../public/img/button2.png") -56px -1622px;

    }
    .play_icon{
        width: 20px;
        height: 18px;
        background: url("../../public/img/button2.png") 0 -1622px;
    }
    .play_text{
        margin-left: 2px;
        color: white;
        font-size: 12px;
    }
    .button_add{
        width: 31px;
        height: 31px;
        background: url("../../public/img/button2.png") 0 -1588px;
    }
    .button_add:hover{
        cursor: pointer;
        background: url("../../public/img/button2.png") -40px -1588px;
    }
    .button_add:active{
        background: url("../../public/img/button2.png") -80px -1588px;
    }
    .song_left_lyric{
        height: 90px;
        margin-top: 35px;
        font-size: 12px;
        overflow: hidden;
    }
    .song_left_lyric_open{
        height: auto;
        overflow: hidden;
    }
    .description_title{
        font-weight: bold;
        color: black;
        font-size: 12px;
    }
    .description_text{
        margin-top: 6px;
        text-indent: 2em;
        color: #666;
    }
    .open_button_box{
        display: flex;
        justify-content: flex-end;
        width: 100%;

    }
    .open_button{
        margin-top: 10px;
        font-size: 12px;
        color:#0c73c2;;
    }
    .open_button:hover{
        cursor: pointer;
        text-decoration: underline;
    }
    .left_bottom{
    }
    .playlist_header{
        display: flex;
        align-items: center;
        height: 30px;
        width: 640px;
        margin-top: 30px;
    }
    .playlist_header_name{
        font-size: 20px;
        margin-right: 15px;
    }
    .playlist_header_mount{
        font-size: 12px;
        margin-right: 385px;
    }

    .list_songs{
        width: 638px;
        border-right: 1px solid lightgray;
        border-left: 1px solid lightgray;
    }
    .songs_sort{
        display: flex;
        align-items: center;
        height: 35px;
        width: 640px;
        margin-top: 5px;
        border-top:2px solid #c10000;
        font-size: 12px;
        color: #555555;
        background-color: #f2f2f2;
    }
    .sort_index{
        display: flex;
        align-items: center;
        width: 74.5px;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        border-right: 1px solid lightgray;
        background: url("../../public/img/table.png");
    }
    .sort_name{
        display: flex;
        align-items: center;
        width: 346px;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        border-right: 1px solid lightgray;
        background: url("../../public/img/table.png");
    }
    .sort_time{
        display: flex;
        align-items: center;
        width: 91px;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        border-right: 1px solid lightgray;
        background: url("../../public/img/table.png");
    }
    .sort_artist{
        display: flex;
        align-items: center;
        width: 128px;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        border-right: 1px solid lightgray;
        background: url("../../public/img/table.png");
    }
    .sort_album{
        display: flex;
        align-items: center;
        width: 128px;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        border-right: 1px solid lightgray;
        background: url("../../public/img/table.png");
    }
    .song{
        position: relative;
        display: flex;
        align-items: center;
        width: 638px;
        height: 30px;
        font-size: 12px;
    }
    .song_last{
        border-bottom: 1px solid lightgray;
    }
    .playing_back{
        background-color: lightgray;
    }
    .song_index{
        display: flex;
        align-items: center;
        width: 74.5px;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        color: gray;
    }
    .song_play{
        position: absolute;
        left: 40px;
        top: 6px;
        font-size: 20px;
        color: #adadad;
    }
    .song_play:hover{
        cursor: pointer;
        color:gray;
    }
    .song_playing{
        color: #cd0000;
    }
    .song_name{
        padding: 6px 0 0 10px;
        width: 346px;
        height: 100%;
        box-sizing: border-box;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .song_name:hover{
        cursor: pointer;
        text-decoration: underline;
    }
    .song_time{
        display: flex;
        align-items: center;
        width: 91px;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
    }
    .song_artist{
        display: flex;
        align-items: center;
        width: 128px;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
    }
    .song_album{
        width: 100px;
        height: 100%;
        padding: 6px 0 0 10px;
        box-sizing: border-box;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
</style>