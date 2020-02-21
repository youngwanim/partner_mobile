import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Quarter from '../views/Quarter.vue'
import MenuInfo from '../views/Menu.vue'
import Login from '../views/Login.vue'
import DoughnutSample from '../views/DoughnutSample.vue'
//import BarSample from '../views/BarSample.vue'
//import HomeTest from '../views/Home_test.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/quarter',
    name: 'Quarter',
    component: Quarter
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuInfo
  },
  {
    path: '/sample',
    name: 'DoughnutSample',
    component: DoughnutSample
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
