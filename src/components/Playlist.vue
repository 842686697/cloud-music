<template>
    <div class="playlist">
        <div class="song_left">
            <div class="left_top">
            <div class="song_left_img_box">
                <el-skeleton-item v-if="!playlist.coverImgUrl"  variant="image"  style="width: 208px; height: 208px;" animated/>
                <img v-else :src="playlist.coverImgUrl" class="song_left_img" width="208px" height="208px"/>
            </div>
            <div class="song_left_text">
                <div class="song_left_title">
                    <div class="song_left_type"></div>
                    <div class="song_left_name">{{playlist.name}}</div>
                </div>
                <div class="song_left_info">
                    <div class="song_left_artist">
                        <el-skeleton-item v-if="!playlist.creator.avatarUrl"  variant="image"  style="width: 35px; height: 35px;" animated/>
                        <img class="artist_img" :src="playlist.creator.avatarUrl" height="35px" width="35px"/>
                        <a href="" class="artist_to">{{playlist.creator.nickname}}</a>
                    </div>
                    <div class="song_left_album">{{transTime()}} 创建</div>
                </div>
                <div class="song_left_buttons">
                    <div class="button_play" @click="pushList()">
                        <div class="play_icon"></div>
                        <div class="play_text">播放</div>
                    </div>
                    <div class="button_add">
                    </div>
                    <div class="button_collect"></div>
                    <div class="button_share"></div>
                    <div class="button_download"></div>
                    <div class="button_comment"></div>
                </div>
                <div class="song_left_lyric">
                    <div class="tag_box">
                        <div class="tag_title">标签： </div>
                        <div class="tag" v-for="(item,index) in playlist.tags">{{item}}</div>
                    </div>
                    <div class="lyric">介绍： {{playlist.description}}</div>
                </div>
            </div>
            </div>
            <div class="left_bottom">
                <div class="playlist_header">
                    <div class="playlist_header_name">播放列表</div>
                    <div class="playlist_header_mount">{{songs.length}}首歌</div>
                    <div class="playlist_header_played">播放： <span>{{playlist.playCount}}</span>次</div>
                </div>
                <div class="list_songs">
                    <div class="songs_sort">
                        <div class="sort_index"></div>
                        <div class="sort_name">歌曲标题</div>
                        <div class="sort_time">时长</div>
                        <div class="sort_artist">歌手</div>
                        <div class="sort_album">专辑</div>
                    </div>
                    <div class="song" :class="{'playing_back':isNowPlaying(item.id)}" v-for="(item,index) in songs">
                        <div class="song_index">{{index}}</div>
                        <i class="iconfont icon-yunhang song_play" @click="playSong(item)" :class="{'song_playing':isNowPlaying(item.id)}"></i>
                        <div class="song_name" @click="toSong(item.id)">{{item.name}}</div>
                        <div class="song_time"></div>
                        <div class="song_artist">{{item.ar[0].name}}</div>
                        <div class="song_album">{{item.al.name}}</div>
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
        name: "Playlist",
        data(){
            return{
                id:Number,
                playlist:{},
                songs:[],
                createTime:''
            }
        },
        methods:{
            //播放已有歌曲
            playSong(song){
                this.$store.commit('playSong',song);
            },
            //查看当前歌曲是否在播放
            isNowPlaying(id){
                let nowid=this.getNowId();
                return nowid==id;
            },
            //获取现在播放歌曲的id
            getNowId(){
              return this.$store.getters.getNowId;
            },
            //跳转歌曲页面
            toSong(id){
              this.$router.push({name:'Song',params:{
                  id:id
                  }})
            },
            //添加歌单进列表
            pushList(){
                if(this.songs.length){
                    this.$store.commit('pushList',this.songs);
                }
            },
            //初始化歌单id
            getInit(){
                this.id=this.$route.params.id;
            },
            //获取歌单信息
            getPlaylist(){
              const id=this.id;
              axios.get(this.common.defaultUrl+'playlist/detail',{
                  params:{
                      id:id
                  }
              }).then(res=>{
                  this.playlist=res.data.playlist;
                  console.log('playlist:',res.data)
              })
            },
            //获取歌单所有歌曲
            getAll(){
                const id=this.id;
                axios.get(this.common.defaultUrl+'playlist/all',{
                    params:{
                        id:id
                    }
                }).then(res=>{
                    this.songs=res.data.songs;
                    console.log('allsongs:',res.data)
                })
            },
            //转换时间格式
            getTime(time){
                var duration = parseInt(time);
                var minute = parseInt(duration/60);
                var sec = duration%60+'';
                var isM0 = ':';
                if(minute == 0){
                    minute = '00';
                }else if(minute < 10 ){
                    minute = '0'+minute;
                }
                if(sec.length == 1){
                    sec = '0'+sec;
                }
                return minute+isM0+sec
            },
            //转换歌曲时长
            transSongTime(time){
                return this.getTime(time);
            },
            transTime(){
                let data=new Date(this.playlist.createTime);
                return data.toLocaleString()
            },
            test(){
                axios.get(this.common.defaultUrl+'test').then(res=>{
                    console.log('test:',res.data)
                })
            }
        },
        created() {
            this.getInit();
            this.getPlaylist();
            this.getAll();
            this.test();
        }
    }
</script>

<style scoped>
    .playlist{
        width: 980px;
        border-left: 1px #c2c2c2 solid;
        border-right: 1px #c2c2c2 solid;
        background-color: white;
    }
    .song_left{
        padding: 35px;
    }
    .left_top{
        display: flex;
        width: 709px;
        box-sizing: border-box;
        border-right: 1px solid #dbdbdb;
    }
    .song_left_img_box{
        position: relative;
        height: 211px;
        padding: 2px;
        border: 2px solid lightgray;
    }
    .song_left_text{
        width: 100%;
        margin-left: 20px;
    }
    .song_left_title{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .song_left_type{
        width: 54px;
        height: 24px;
        background: url("../../public/img/icon.png") 0 -243px;
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
        display: flex;
        align-items: center;
        font-size: 12px;
    }
    .song_left_artist{
        display: flex;
        align-items: center;
        color: #929292;
    }
    .artist_img{

    }
    .artist_to{
        margin-left: 10px;
    }
    .song_left_album{
        margin-left: 20px;
        color: #929292;
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
        margin-top: 20px;
        font-size: 12px;
    }
    .song_left_lyric_open{
        height: 290px;
        overflow: hidden;
    }
    .tag_title{
        font-size: 12px;
    }
    .tag{
        display: flex;
        align-items: center;
        height: 20px;
        width: auto;
        padding: 0 12px;
        margin-left: 5px;
        border-radius: 10px;
        background-color: #ebebeb;
        font-size: 12px;
        color: #6d6d6d;
    }
    .tag_box{
        display: flex;
        align-items: center;
        margin: 6px 0 10px 0;
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
    .playlist_header_played{

        font-size: 12px;
    }
    .playlist_header_played span{
        font-weight: bold;
        color: #bf0000;
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
        width: 236px;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        border-right: 1px solid lightgray;
        background: url("../../public/img/table.png");
    }
    .sort_time{
        display: flex;
        align-items: center;
        width: 111px;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        border-right: 1px solid lightgray;
        background: url("../../public/img/table.png");
    }
    .sort_artist{
        display: flex;
        align-items: center;
        width: 90px;
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
        width: 236px;
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
        width: 111px;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
    }
    .song_artist{
        display: flex;
        align-items: center;
        width: 90px;
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