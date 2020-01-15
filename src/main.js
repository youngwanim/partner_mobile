import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import {store} from './store'
import axios from 'axios'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(VueCookies)

Vue.$cookies.config('30d')

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
