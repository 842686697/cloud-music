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
      let id=state.songList[state.nowSong].detail.id;
      return id;
    }
  },
  mutations: {
    //添加一首歌曲
    playSong:(state,song) => {
      state.songList.push(song);
      state.nowSong=state.songList.length-1;
      console.log('歌曲列表+1，歌单：',state.songList);
    },
    //选择歌曲
    selectSong(state,index){
      state.nowSong=index;
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
