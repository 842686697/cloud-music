<template>
    <div class="song">
        <div class="song_left">
            <div class="song_left_img_box">
                <img :src="song.al.picUrl" class="song_left_img" width="130px" height="130px"/>
                <div class="song_left_img_back"></div>
            </div>
            <div class="song_left_text">
                <div class="song_left_title">
                    <div class="song_left_type"></div>
                    <div class="song_left_name">{{song.name}}</div>
                </div>
                <div class="song_left_info">
                    <div class="song_left_artist">歌手：<a href="" class="artist_to">{{song.ar[0].name}}</a></div>
                    <div class="song_left_album">所属专辑：<a href="" class="artist_to">{{song.al.name}}</a></div>
                </div>
                <div class="song_left_buttons">
                    <div class="button_play" @click="play()" >
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
                <div class="song_left_lyric" :class="{'song_left_lyric_open':isOpen}">
                    <div class="lyric" v-for="(item,index) in lyric" :key="index">{{item}}</div>
                </div>
                <div v-if="isOpen" class="lyric_open_button" @click="lyricOpen()">展开↓</div>
                <div v-else class="lyric_open_button" @click="lyricOpen()">收起↑</div>
            </div>
        </div>
        <div class="song_right"></div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Song",
        data(){
            return{
                song:{},
                lyric:[],
                isOpen:true,
                id:Number
            }
        },
        created() {
            this.getInit();
            this.getSong();
            this.getLyric();
            this.getUrl();
            this.test();
        },
        methods:{
            //初始化歌曲id
            getInit(){
                this.id=this.$route.params.id;
            },
            //获取歌曲
            getSong(){
                const id=this.id;
                axios.get(this.common.defaultUrl+'song/detail',{
                    params:{
                        id:id
                    }
                }).then(res=>{
                    console.log('detail:',res.data)
                    this.song=res.data.songs[0]
                })
            },
            //获取歌词,利用正则表达式把歌词前面的时间提取出来
            getLyric(){
                const id=this.id;
                axios.get(this.common.defaultUrl+'song/lyric',{
                    params:{
                        id:id
                    }
                }).then(res=>{
                    console.log('lyric:',res.data)
                    let lyricString=res.data.lrc.lyric;
                    let lyricList=lyricString.split('\n');
                    let reg=/\[\d*:\d*\.\d*]/
                    for(let i =0;i<lyricList.length;i++){
                        let match=lyricList[i].match(reg);
                        let content=lyricList[i].replace(match,'');
                        this.lyric.push(content)
                    }

                })
            },
            getUrl(){
                const id=this.id;
                axios.get(this.common.defaultUrl+'song/url',{
                    params:{
                        id:id
                    }
                }).then(res=>{
                    this.url=res.data.data[0].url;
                    console.log('url:',res.data)
                })
            },
            lyricOpen(){
              this.isOpen=!this.isOpen;
            },
            play(){
                //构建歌曲
                let song={}
                song=this.song;
                song.lyric=this.lyric;
                this.$store.commit('playSong',song)
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
    .song{
        width: 980px;
        border-left: 1px #c2c2c2 solid;
        border-right: 1px #c2c2c2 solid;
        background-color: white;
    }
    .song_left{
        display: flex;
        width: 709px;
        box-sizing: border-box;
        padding: 35px;
        border-right: 1px solid #dbdbdb;
    }
    .song_left_img_box{
        position: relative;
        padding: 38px;
    }
    .song_left_img_back{
        position: absolute;
        left: 0;
        top: 0;
        width: 206px;
        height: 205px;
        background: url("../../public/img/coverall.png") -140px -580px;
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
        background: url("../../public/img/icon.png") 0 -463px;
    }
    .song_left_name{
        margin-left: 10px;
        font-size: 24px;
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
        color: #929292;
    }
    .song_left_album{
        margin-top: 10px;
        color: #929292;
    }
    .song_left_buttons{
        display: flex;
        margin-top: 10px;
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
        margin-top: 35px;
        font-size: 12px;
    }
    .song_left_lyric_open{
        height: 290px;
        overflow: hidden;
    }
    .lyric{
        margin-top: 6px;
    }
    .lyric_open_button{
        margin-top: 10px;
        font-size: 12px;
        color:#0c73c2;;
    }
    .lyric_open_button:hover{
        cursor: pointer;
    }
</style>