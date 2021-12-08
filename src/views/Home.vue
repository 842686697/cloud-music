<template>
  <div class="home">
    <header class="header" >
      <div class="header_box" :gutter="40" >
        <div :span="4" class="nav" :class="{nav_clicked:click==1}">推荐</div>
        <div :span="4" class="nav" :class="{nav_clicked:click==2}">排行榜</div>
        <div :span="4" class="nav" :class="{nav_clicked:click==3}">歌单</div>
        <div :span="4" class="nav" :class="{nav_clicked:click==4}">主播电台</div>
        <div :span="4" class="nav" :class="{nav_clicked:click==5}">歌手</div>
        <div :span="4" class="nav" :class="{nav_clicked:click==6}">新碟上架</div>
      </div>
    </header>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  data(){
    return{
      click:1
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
</style>
