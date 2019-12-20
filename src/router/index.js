import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BarSample from '../views/BarSample.vue'
//import HomeTest from '../views/Home_test.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/sales',
    name: 'sales',
    component: BarSample
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
