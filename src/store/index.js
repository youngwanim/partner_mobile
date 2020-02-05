import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import router from '@/router'
import salesinfo from '@/store/modules/salesInfo'
import api from '@/api/api.js'
import axios from 'axios'


Vue.use(Vuex)

const type = {
  LOGIN: 'LOGIN',
  VALIDATION: 'VALIDATION'
}

export const store = new Vuex.Store({
  state: {
    account : '',
    password : '',
    name: '',
    loginFail: false,
    authState: false,
    error: false
  },
  getters: {
    getAccount: (state) => state.account,
    getPassword: (state) => state.password,
    getLoginFail: (state) => state.loginFail,
    getAuthState: (state) => state.authState,
    getError: (state) => state.error
  },
  mutations: {
    setAccount: (state, payload) => state.account = payload,
    setPassword: (state, payload) => state.password = payload,
    setName: (state, payload) => state.name = payload,
    setAuthState: (state, payload) => state.authState = payload,
    setError: (state,payload) => state.error = payload
  },
  actions: {
    [type.LOGIN]({commit, state}) {
      let param = {
        'account': state.account,
        'password': state.password
      }
      return api.async_call('login', param).then((result) => {
        sessionStorage.setItem('token', result.data.token)
        sessionStorage.setItem('openid', result.data.openid)
        VueCookies.set('openid', result.data.openid)
        VueCookies.set('token', result.data.token)
        commit('setName', result.data.info.name)
        commit('setAuthState', true)
        axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`
        router.push('/quarter')
      }).catch(() => {
        state.loginFail = true
        VueCookies.remove('openid')
        VueCookies.remove('token')
        commit('setAuthState', false)
      })
    },
    [type.VALIDATION]({commit, state}) {
      if (!axios.defaults.headers.common['Authorization']) {
        axios.defaults.headers.common['Authorization'] = 'bearer ' + VueCookies.get('token')
      }

      return api.async_call('validation').then((result) => {
        commit('setName', result.data.info.name)
        commit('setAuthState', true)
        router.push('/quarter')
      }).catch(() => {
        state.loginFail = true
        axios.defaults.headers.common['Authorization'] = null
        VueCookies.remove('openid')
        VueCookies.remove('token')
        commit('setAuthState', false)
      })
    }
  },
  modules: {
    salesinfo,
  }
});


// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
