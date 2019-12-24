import st_config from '@/config/config.js'

export default {
  login: {
    url: st_config.api_url + '/platform/operators/sign/',
    method: 'post',
    headers: get_header_info()
  },
  getSalesInfo: {
    url: st_config.resApi_url + '/analdb/partners/sales?res_type={res_type}&\
restaurant_id={restaurant_id}&start_date={start_date}&end_date={end_date}',
    method: 'get',
    header: {'Content-Type': 'application/json; charset=utf-8'}
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
  const header_info = {
    'Accept-Language': 'en',
    'Content-Type': 'application/json; charset=utf-8'
  };
  return header_info;
}
