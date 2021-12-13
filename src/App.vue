<template>
  <div id="app">
    <header class="header">
      <div class="header_box">
          <el-row  class="header_left">
              <el-col :span="6" class="home">
                  <router-link to="/" class="home_text">仿网易云音乐</router-link>
              </el-col>
              <el-col :span="4" class="col">
                  <router-link to="/" class="text" :class="{text_clicked:router=='Home'}">发现音乐</router-link>
                  <div class="square" :class="{_none:router!='Home'}"></div>
              </el-col>
              <el-col :span="4" class="col">
                  <router-link to="/myMusic" class="text" :class="{text_clicked:router=='MyMusic'}">我的音乐</router-link>
                  <div class="square" :class="{_none:router!='MyMusic'}"></div>
              </el-col>
              <el-col :span="4" class="col">
                  <router-link to="/Friend" class="text" :class="{text_clicked:router=='Friend'}">朋友</router-link>
                  <div class="square" :class="{_none:router!='Friend'}"></div>
              </el-col>
              <el-col :span="4" class="col">
                  <router-link to="/Download" class="text" :class="{text_clicked:router=='Download'}">下载客户端</router-link>
                  <div class="square" :class="{_none:router!='Download'}"></div>
              </el-col>
          </el-row>
          <div class="header_right">
            <div class="input_box">
              <i class="iconfont icon-sousuo"></i>
              <input v-model="input" prefix-icon="./assets/logo.png" placeholder="音乐/视频/电台/用户" class="input"></input>
            </div>
            <el-button round class="button_creater">创作者中心</el-button>
            <el-button type="text" class="button_login">登陆</el-button>
          </div>
        </div>
      </header>
      <main>
          <router-view/>
      </main>
      <footer class="footer">

      </footer>
  </div>
</template>
<script>
  export default {
    name: "App",
    data(){
      return {
        router: 'Home',
        input:''
      }
    },
      methods:{
        //点击路由改变顶层header的样式
        changeClass(to){
            this.router=to.matched[0].name
        }
      },
      watch:{
        //监听路由
          $route(to,from){
              this.changeClass(to);
          }
      },
      created() {

      },
      mounted(){
        console.log(this.$route);
      },
  }
</script>
<style scoped>
#app {
  width: 1519px;
  color: #2c3e50;
}
._none{
    display: none;
}
.home{

}
.home_text{
    font-size: 20px;
    color: #dddddd;
}
.header{
  display: flex;
  justify-content: center;
  width: 1519px;
  height: 60px;
  background: #242424;
}
.header_box{
  display: inline-block;
  width: 1100px;
}
.header_left{
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left:20px;
  width: 50%;
  height: 100%;
}
.header_right{
  float:right;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 100%;
}
.button_creater{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  border: 1px #585858 solid;
  color: white;
  font-size: 12px;
  background-color: black;
}
.button_login{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 30px;
  color: gray;
  font-size: 12px;
}
.input_box{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin-right:20px ;
  padding-left: 5px;
  background: white;
  border-radius: 20px;
}
.input{
  width: 120px;
  height: 25px;
  border-radius: 20px;
  outline: none;
  border: none;
  color: gray;
  font-size: 12px;
}
.input:focus{
  color: black;
}
.square{
    position: absolute;
    left: 50%;
    top: 53px;
    width: 0;
    height: 0;
    margin-left: -6px;
    border-bottom: 6px solid #c20c0c;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
}
.col{
    position: relative;
    height: 100%;
}
.text{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: lightgray;
    font-size: 14px;
}
.text_clicked{
    background-color: #000001;
    color: white;
}
.text:hover{
    background-color: #000001;
    color: white;
}
.footer{
    width: 100%;
    height: 250px;
    border-top: 1px #a8a8a8 solid;
    background-color: lightgray;
}
</style>
