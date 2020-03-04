import st_config from '@/config/config.js'
import VueCookies from 'vue-cookies'
export default {
  login: {
    url: st_config.resApi_url + '/analdb/partners/signin',
    method: 'post',
    headers: get_header_info
  },
  validation: {
    url: st_config.resApi_url + '/analdb/partners/validation',
    method: 'get',
    headers: get_header_info
  },
  getSalesInfo: {
    url: st_config.resApi_url + '/analdb/partners/sales?res_type={res_type}&\
start_date={start_date}&end_date={end_date}',
    method: 'get',
    headers: get_header_info
  },
  getMenuSales: {
    url: st_config.resApi_url + '/analdb/partners/menusales/{menu_id}?res_type={res_type}&\
start_date={start_date}&end_date={end_date}',
    method: 'get',
    headers: get_header_info
  },
  getMonthSales: {
    url: st_config.resApi_url + '/analdb/partners/menusales?res_type={res_type}&\
start_date={start_date}&end_date={end_date}',
    method: 'get',
    headers: get_header_info
  },
  getMenuInfo: {
    url: st_config.resApi_url + '/analdb/partners/menus',
    method: 'get',
    headers: get_header_info
  }
}

// function get_header_info_form_data() {
//   const header_info = {
//     'Content-Type': 'multipart/form-data'
//   };
//   return header_info;
// }
//
// function get_header_info_auth() {
//   const header_info = {
//     'Accept-Language': 'en',
//     'Content-Type': 'application/json; charset=utf-8',
//     'open-id': 'test'
//   };
//   return header_info;
// }

function get_header_info() {
  let header_info = {
    'Accept-Language': 'en',
    'Content-Type': 'application/json',
    'open-id': VueCookies.get('openid')
    // 'authorization': 'bearer ' + VueCookies.get('token')
  };
  return header_info;
}
