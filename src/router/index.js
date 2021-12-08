import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyMusic from "../views/MyMusic";
import Friend from "../views/Friend";
import Download from "../views/Download";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/myMusic',
    name: 'MyMusic',
    component: MyMusic
  },
  {
    path:'/friend',
    name:'Friend',
    component:Friend
  },
  {
    path:'/download',
    name:'Download',
    component:Download
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
