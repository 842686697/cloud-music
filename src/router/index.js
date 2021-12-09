import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import MyMusic from "../views/MyMusic";
import Friend from "../views/Friend";
import Download from "../views/Download";
import Recommend from "../views/Home/children/Recommend";
import Rank from "../views/Home/children/Rank";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:'/recommend',
    children:[
      {
        path:'/recommend',
        name:'Recommend',
        component:Recommend
      },
      {
        path:'/rank',
        name:'Rank',
        component:Rank
      }
    ]
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
