//import Vue from 'vue'
import config from './config.js'
import axios from 'axios'

export default {
  async_call(api, param, replace_obj = null) {
    let origin_url = config[api].url
        //vue = new Vue()
    if (replace_obj !== null) {
      for (let key in replace_obj) {
        origin_url = origin_url.replace(key, replace_obj[key])
      }
    }
    return axios({
      method: config[api].method,
      url: origin_url,
      headers: config[api].headers(),
      data: param || {}
    }).catch((error) => {
      const err = error.response.data
      console.log('error with axios: ', err);
      if(err.code === 500) {
        alert(err.message)
        return
      }
    })
  },
  async_call_callback(api, param, replace_obj = null, cb_res=null, cb_error=null) {
    let origin_url = config[api].url
        //vue = new Vue()
    if (replace_obj !== null) {
      for (let key in replace_obj) {
        origin_url = origin_url.replace(key, replace_obj[key])
      }
    }
    return axios({
      method: config[api].method,
      url: origin_url,
      headers: config[api].headers(),
      data: param || {}
    }).then((result) => {
      if (cb_res) {
        cb_res(result)
      }
    }).catch((error) => {
      if (cb_error) {
        cb_error(error)
      }
    })
  }
}
