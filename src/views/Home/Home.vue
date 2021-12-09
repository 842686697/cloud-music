<template>
  <div class="home">
    <header class="header" >
      <div class="header_box" :gutter="40" >
        <div :span="4" class="nav" :class="{nav_clicked:click=='Recommend'}"><router-link to="/recommend"  class="router-link">推荐</router-link></div>
        <div :span="4" class="nav" :class="{nav_clicked:click=='Rank'}"><router-link to="/rank" class="router-link">排行榜</router-link></div>
        <div :span="4" class="nav" :class="{nav_clicked:click==3}"><router-link to="" class="router-link">歌单</router-link></div>
        <div :span="4" class="nav" :class="{nav_clicked:click==4}"><router-link to="" class="router-link">主播电台</router-link></div>
        <div :span="4" class="nav" :class="{nav_clicked:click==5}"><router-link to="" class="router-link">歌手</router-link></div>
        <div :span="4" class="nav" :class="{nav_clicked:click==6}"><router-link to="" class="router-link">新碟上架</router-link></div>
      </div>
    </header>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  data(){
    return{
      click:'Recommend'
    }
  },
  methods:{
    changeCss(name){
      this.click=name
    }
  },
  watch:{
    $route(to,from){
      this.changeCss(to.name);
    }
  }
}
</script>
<style scoped>
  .header{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 30px;
    background-color: #c10c0c;
    color: white;
  }
  .header_box{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 700px;
    height: 100%;
    box-sizing: border-box;
    padding-right:150px;
   }
  .nav{
    display: flex;
    justify-content: center;
    align-items: center;
    height:20px;
    padding: 1px 15px;
    border-radius: 20px;
    font-size: 10px;

  }
  .nav_clicked{
    background-color: #9a0909;
  }
  .router-link{
    color: white;
  }
</style>
