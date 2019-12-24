import Vue from 'vue'
import Vuex from 'vuex'
import salesinfo from '@/store/modules/salesInfo'

Vue.use(Vuex)

const type = {
  LOGIN: 'LOGIN'
}

export const store = new Vuex.Store({
  state: {
    account : '',
    password : '',
    loginFail: false,
    error: false
  },
  getters: {
    getAccount: (state) => state.account,
    getPassword: (state) => state.password,
    getLoginFail: (state) => state.loginFail,
    getError: (state) => state.error
  },
  mutations: {
    setAccount: (state, payload) => state.account = payload,
    setPassword: (state, payload) => state.password = payload,
    setError: (state,payload) => state.error = payload
  },
  actions: {
    [type.LOGIN]({commit, state}, status) {
      let param = {
        'account': state.account,
        'password': state.password
      }

      return api.async_call('login', param).then((result) => {
        sessionStorage.setItem('token', result.data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`
        router.push('/curation')
      }).catch(() => {
        state.loginFail = true
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
