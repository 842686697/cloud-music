import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songList:[],
    nowSong:0
  },
  getters:{
    getList:state => {
      return state.songList;
    },
    getNow:state => {
      return state.nowSong;
    },
    getNowId:state => {
      if(state.songList.length){
        let id=state.songList[state.nowSong].id;
        return id;
      }
    }
  },
  mutations: {
    //添加一首歌曲
    playSong:(state,song) => {
      //判断是否重复
      let bool=true;
      for(let i=0;i<state.songList.length;i++){
        if(state.songList[i].id==song.id){
          state.nowSong=i;
          bool=false;
        }
      }
      if(bool){
        state.songList.push(song);
        state.nowSong=state.songList.length-1;
        console.log('歌曲列表+1，歌单：',state.songList);
      }else{
        console.log('歌曲添加重复');
      }
    },
    //添加列表
    pushList:(state,songs)=>{
      state.songList=[];
      state.songList=state.songList.concat(songs);
      console.log('添加进列表')
    },
    //选择歌曲
    selectSong(state,id){
      for(let i=0;i<state.songList.length;i++){
        if(state.songList[i].id==id){
          state.nowSong=i
          break;
        }
      }
    },
    //清空歌单
    clearList:state => {
      state.songList=[];
      console.log('歌曲列表清空，歌单：',state.songList)
    },
    //删除列表中一个歌曲
    clearSong:(state,index) => {
      state.songList.splice(index,1);
    },
    //下一首歌
    nextSong : state =>{
      if(state.nowSong+1>=state.songList.length){
        state.nowSong=0
      }
      else{
        state.nowSong+=1;
      }
      console.log('切换上一首歌')
    },
    //上一首歌
    prevSong:state => {
      if(state.nowSong-1<0){
        state.nowSong=state.songList.length-1
      }
      else{
        state.nowSong-=1;
      }
      console.log('切换下一首歌')
    }
  },
  actions: {
  },
  modules: {
  }
})
