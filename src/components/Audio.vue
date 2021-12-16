<template>
    <div id="audio">
        <div class="audio_box">
            <div class="audio_top">
                <div class="top_lock"></div>
            </div>
            <div class="audio_content">
                <div class="content_warp">
                    <div class="audio_control">
                        <i @click="prevSong()" class="iconfont icon-shangyiqu control_left"></i>
                        <div>
                            <i v-if="!status" @click="playAndPause()" class="iconfont icon-yunhang control_center"></i>
                            <i v-else @click="playAndPause()" class="iconfont icon-bofangzhong control_center"></i>
                        </div>
                        <i @click="nextSong()" class="iconfont icon-xiayiqu control_right"></i>
                    </div>
                    <div class="audio_info">
                        <img class="img" @click="toSong()" :src="getImg" width="34" height="34"  />
                        <div class="info_right">
                            <div class="info">
                                <div class="info_name" @click="toSong()">{{this.$store.state.songList.length!=0?this.$store.state.songList[this.$store.state.nowSong].name:''}}</div>
                                <div class="info_artist">{{this.$store.state.songList.length!=0?this.$store.state.songList[this.$store.state.nowSong].ar[0].name:''}}</div>
                            </div>
                            <div class="progress" >
                                <div class="ready" :style="{'width':ready}"></div>
                                <div class="cur" :style="{'width':cur}"></div>
                                <div class="point" :style="{'left':cur}">
                                    <div class="point_inner"></div>
                                </div>
                                <div class="progress_cover" @click="setProgress($event)"></div>
                            </div>
                        </div>
                        <div class="time">{{nowTime}}<span> / {{allTime}}</span></div>
                    </div>
                    <div class="audio_function">
                        <div @click.self="changeSoundStatus()" class="sound">
                            <div v-if="sound_box" class="sound_box">
                                <div class="sound_progress">
                                    <div class="sound_cur" :style="{'height':soundCur}"></div>
                                    <div class="sound_point" :style="{'bottom':soundCur}">
                                        <div class="sound_point_inner"></div>
                                    </div>
                                    <div @click.self="changeSound($event)"  class="sound_cover"></div>
                                </div>
                            </div>
                        </div>
                        <div class="mode"></div>
                        <div class="list" @click.self="listStatusChange()" >
                            <div class="list_amount" @click.self="listStatusChange()">
                                {{getListAmount}}
                            </div>
                            <div v-if="listDisplay" class="list_box">
                                <div class="list_top">
                                    <div class="list_top_left">
                                        <div class="list_top_back">
                                            <div class="playlist">播放列表({{getListAmount}})</div>
                                            <div class="clearAll_box" @click="clearList()">
                                                <div class="clearAll"></div>
                                                <div class="clearAll_text">清除</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="list_top_right"></div>
                                </div>
                                <div class="list_bottom">
                                    <div class="list_bottom_left">
                                        <div class="song_box" @click="selectSong(item.id)" :class="{'song_box_play':isNow(index)}" v-for="(item,index) in list" :key="index" >
                                            <div class="list_playicon" :class="{'list_playicon_play':isNow(index)}"></div>
                                            <div class="list_song_name">{{item.name}}</div>
                                            <div @click="clearSong($event)" :index="index" class="clear"></div>
                                            <div class="list_song_ar">{{item.ar[0].name}}</div>
                                            <div class="list_song"></div>
                                        </div>
                                    </div>
                                    <div class="list_bottom_right"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Audio",
        data(){
            return{
                //音乐播放状态
                list:[],
                status:false,
                audio:{},
                defaultUrl:require('../../public/img/default_album.jpg'),
                //音乐当前进度条
                cur:0,
                //音乐缓冲进度条
                ready:0,
                nowTime:'00:00',
                allTime:'00:00',
                sound_box:false,
                //当前音量
                soundCur:'50%',
                listDisplay:false

            }
        },
        methods:{
            //在列表中选择歌曲
            selectSong(id){
                this.$store.commit('selectSong',id)
            },
            //列表中此歌曲是否是正在听的歌曲
            isNow(index){
                return index == this.$store.state.nowSong;
            },
            clearList(){
                this.$store.commit('clearList');
            },
            clearSong(e){
                this.$store.commit('clearSong',e.currentTarget.index)
            },
            //歌曲列表视图切换
            listStatusChange(){
                this.listDisplay=!this.listDisplay;
            },
            changeSound(e){
                let progress=(90-e.layerY)/90;
                this.soundCur=progress*100+'%';
                this.audio.volume=progress
            },
            changeSoundStatus(){
                this.sound_box=!this.sound_box;
            },
            //跳转歌曲页面
            toSong(){
                let id=this.getNowId();
                if(this.$route.name!='Song'){
                    this.$router.push({name:'Song',params:{
                            id
                        }})
                }
            },
            playAndPause(){
                if(!this.status){
                    this.audio.play()
                    console.log('on')
                    this.status=true;
                }
                else {
                    this.audio.pause()
                    console.log('pause');
                    this.status=false;
                }
            },
            getNowIndex(){
                return this.$store.state.nowSong;
            },
            //获取当前播放歌曲的id
            getNowId(){
                return this.$store.getters.getNowId;
            },
            //更新当前歌曲的src到audio上
            updateSrc(){
                let id=this.$store.state.songList[this.$store.state.nowSong].id;
                this.audio.src=`https://music.163.com/song/media/outer/url?id=${id}.mp3`;
                this.status=true;
            },
            prevSong(){
                this.$store.commit('prevSong');
                this.updateSrc();
            },
            nextSong(){
                this.$store.commit('nextSong');
                this.updateSrc();
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
            //设置总时间
            setAllTime(){
                let time =this.audio.duration;
                this.allTime=this.getTime(time);
                console.log(time)
            },
            //设置现在的时间
            setNowTime(){
                let time =this.audio.currentTime;
                this.nowTime=this.getTime(time);
            },
            setProgress(e){
                let progress=e.layerX/466;
                let time=this.audio.duration;
                this.audio.currentTime=time*progress;
            },
            //更新当前进度条
            updateCur(){
                var value = Math.round((Math.floor(this.audio.currentTime) / Math.floor(this.audio.duration)) * 100, 0);
                this.cur=value+'%'
                this.setNowTime();
            },
            //缓冲待完成..
            updateReady(){
                // let buffLength=this.audio.buffered.end(0)-this.audio.buffered.start(0);
                // var value = Math.round((Math.floor(buffLength) / Math.floor(this.audio.duration)) * 100, 0);
                // this.ready=value+'%'

            },
            //歌曲结束换下一首
            songEnd(){
                this.$store.commit('nextSong');
                this.updateSrc();
            }
        },
        computed:{
            getImg(){
                return this.$store.state.songList.length!=0?this.$store.state.songList[this.$store.state.nowSong].al.picUrl:this.defaultUrl
            },
            getListAmount(){
                return this.$store.state.songList.length
            }
        },
        watch:{
            //监听vuex中歌单的变化
            '$store.state.songList':function (val,oldVal) {
                if(val.length==1){
                    this.updateSrc();
                    console.log('添加第一首歌');
                }
                else if(val.length>1){
                    this.updateSrc();
                    console.log('添加歌曲');
                }
                else if(val.length==0){
                    this.audio.src='';
                }
                this.list=val;
            },
            '$store.state.nowSong':function () {
                this.updateSrc();
                this.status=true;
                this.cur=0;
                this.ready=0;
            }
        },
        created() {
            let audio=new Audio();
            audio.volume=0.5;
            audio.autoplay=true;
            audio.addEventListener('timeupdate',this.updateCur,false);
            audio.addEventListener('progress',this.updateReady,false);
            audio.addEventListener('ended',this.songEnd,false);
            audio.addEventListener('loadedmetadata',this.setAllTime,false);
            this.audio=audio;
        },
    }
</script>

<style scoped>
    .audio_box{
        position: fixed;
        z-index: 200000;
        bottom: 0;
        left: 0;
    }
    .audio_top{
        position: absolute;
        right: 100px;
        bottom: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 22px;
        width: 52px;
        margin-bottom: 46px;
        background: url("../../public/img/playbar.png") 0 -380px;
    }
    .top_lock{
        width: 18px;
        height: 18px;
        margin-top: 5px;
        background: url("../../public/img/playbar.png") -100px -380px;
    }
    .top_lock:hover{
        cursor: pointer;
        background: url("../../public/img/playbar.png") -100px -400px;

    }
    .audio_content{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 47px;
        width: 1536px;
        background-color: #2c2b2b;
    }
    .content_warp{
        display: flex;
        width: 984px;
        height: 47px;
    }
    .audio_control{
        display: flex;
        align-items: center;
    }
    .control_left{
        font-size: 25px;

        color: #a9a9a9;
    }
    .control_left:hover{
        cursor: pointer;
        color: lightgray;
    }
    .control_center{
        margin-left: 10px;
        color: #d6d6d6;
        font-size: 35px;
    }
    .control_center:hover{
        color: white;
        cursor: pointer;
    }
    .control_right{
        margin-left: 10px;
        font-size: 25px;
        color: #a9a9a9;
    }
    .control_right:hover{
        cursor: pointer;
        color: lightgray;
    }
    .audio_info{
        display: flex;
        align-items: center;
        height: 100%;
        margin-left: 30px;
    }
    .img:hover{
        cursor: pointer;
    }
    .info_right{
        padding:10px 5px;
        box-sizing: border-box;
        margin-left: 10px;
    }
    .info{
        display: flex;
        padding-bottom: 5px;
        height: 16px;
    }
    .info_name{
        font-size: 12px;
        color: #e1e1e1;
        margin-right: 20px;
    }
    .info_name:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    .info_artist{
        font-size: 12px;
        color: gray;
    }
    .progress{
        position: relative;
        width: 466px;
        height: 9px;
        border-radius: 5px;
        background-color: black;
    }
    .progress:hover{

        cursor: pointer;
    }
    .progress_cover{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .cur{
        position: absolute;
        left: 0;
        top: 0;
        width:50%;
        height: 9px;
        border-radius: 5px 0 0 5px;
        background-color: #c10000;
    }
    .ready{
        position: absolute;
        left: 0;
        top: 0;
        width:80%;
        height: 9px;
        border-radius: 5px;
        background-color: gray;
    }
    .point{
        position: absolute;
        left: 50%;
        top: -4px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 17px;
        height: 17px;
        background-color: white;
    }
    .point_inner{
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: #c10000;
    }
    .time{
        margin: 20px 0 0 10px;
        font-size: 12px;
        color: #a5a5a5;
    }
    .time span{
        color: #696969;
    }
    .audio_function{
        display: flex;
        align-items: center;
        margin-left: 25px;
    }
    .sound{
        position: relative;
        width: 25px;
        height: 25px;
        background:url("../../public/img/playbar.png") -2px -248px;
     }
    .sound:hover{
        cursor: pointer;
        background:url("../../public/img/playbar.png") -31px -248px;
    }
    .sound_box{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        top:-124px ;
        height: 113px;
        width: 32px;
        background-color: #353535;
    }
    .sound_progress{
        position: relative;
        height: 90px;
        width: 5px;
        margin-top: 10px;
        border-radius: 5px;
        background-color: black;
    }
    .sound_cur{
        position: absolute;
        left: 0;
        bottom: 0;
        height:50%;
        width: 5px;
        border-radius: 5px;
        background-color: #c20000;
    }
    .sound_point{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: -5px;
        bottom: 0;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        background-color: #e0e0e0;
    }
    .sound_point_inner{
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #c20000;
    }
    .sound_cover{
        position: absolute;
        top: 0;
        left: -2.5px;
        height: 100%;
        width:10px;
    }
    .mode{
        width: 25px;
        height: 25px;
        background:url("../../public/img/playbar.png") -66px -344px;
    }
    .mode:hover{
        cursor: pointer;
        background:url("../../public/img/playbar.png") -93px -344px;
    }
    .list{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 60px;
        height: 25px;
        background:url("../../public/img/playbar.png") -42px -68px;
    }
    .list:hover{
        cursor: pointer;
        background:url("../../public/img/playbar.png") -42px -98px;
    }
    .list_amount{
        margin-left: 15px;
        font-size: 12px;
        color: #9b9b9b;
    }
    .list_box{
        position: absolute;
        top:-311px;
        right: -100px;
        height: 301px;
        width: 986px;
        background-color: #151515;
    }
    .list_box{
        cursor: auto;
    }
    .list_top{
        display: flex;
        height: 41px;
        width: 100%;
    }
    .list_top_left{
        width: 553px;
        display: flex;
        align-items: center;
    }
    .list_top_back{
        display: inline-block;
        width: 100%;
    }
    .playlist{
        float: left;
        width: 100px;
        margin-left: 30px;
        font-size: 14px;
        font-weight: bold;
        color: white;
    }
    .clearAll_box{
        display: flex;
        align-items: center;
        float: right;
        margin-right: 10px;
    }
    .clearAll_box:hover,.clearAll_box:hover .clearAll_text{
        cursor: pointer;
        text-decoration: underline;
    }
    .clearAll_box:hover .clearAll{
        background: url("../../public/img/playlist.png") -51px -20px;
        cursor: pointer;
    }
    .clearAll{
        height: 13px;
        width: 13px;
        margin-right: 8px;
        background: url("../../public/img/playlist.png") -51px 0;
    }
    .clearAll_text{
        font-size: 12px;
        font-weight: bold;
        color: #bbbbbb;
    }
    .list_bottom{
        height: 260px;
        width: 100%;
    }
    .list_bottom_left{
        overflow: auto;
        height: 100%;
        width: 553px;
        border-right:5px solid black;
        background-color: #333333;
    }
    .song_box{
        display: flex;
        align-items: center;
        height: 28px;
        width: 100%;
        background-color: #333333;
    }
    .song_box_play{
        background-color: #252525;
    }
    .song_box:hover{
        cursor: pointer;
        background-color: #252525;
    }
    .song_box:hover .clear{
        visibility: visible;
    }
    .list_playicon{
        visibility: hidden;
        width: 13px;
        height: 13px;
        background: url("../../public/img/playlist.png") -182px 0;
        margin: 0 8px 0 10px;
    }
    .list_playicon_play{
        visibility: visible;
    }
    .list_song_name{
        font-size: 12px;
        color: white;
        width: 90px;
        margin:0 350px 0 0;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .list_song_ar{
        width: 50px;
        font-size: 12px;
        color: white;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .clear{
        visibility: hidden;
        width: 13px;
        height: 13px;
        margin-right: 8px;
        background: url("../../public/img/playlist.png") -51px 0;
    }
</style>