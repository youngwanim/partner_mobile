import router from '@/router'
import api from '@/api/api.js'
import hDate from './util/date.js'
import chart from './util/chart.js'

const type = {
  GET_MENU_INFO: 'GET_MENU_INFO',
  GET_SALES_INFO: 'GET_SALES_INFO',
  GET_SALES_INFO_PER_MENU: 'GET_SALES_INFO_PER_MENU',
  GET_SINGLE_MENU_SALES_INFO: 'GET_SINGLE_MENU_SALES_INFO'
}

const state = {
  bLoading: false,
  bLoadingMenuSales: {},
  restaurant_id: 12,
  quarterList: [],
  selectedQuarter: {},
  yearList: [],
  selectedYearIndex: 0,
  salesInfo: null,
  salesChartInfo: {},
  menuInfo: [],
  menuSalesInfo: {},
  menuSalesChartInfo: {},
  firstOrderDate: ''
}

const getters = {
  getLoading: state => state.bLoading,
  getLoadingMenuSales: state => state.bLoadingMenuSales,
  getSalesInfo: state => state.salesInfo,
  getSalesChartInfo: state => state.salesChartInfo,
  getMenuInfo: state => state.menuInfo,
  getMenuSalesInfo: state => state.menuSalesInfo,
  getMenuSalesChartInfo: state => state.menuSalesChartInfo,
  getRestaurantID: state => state.restaurant_id,
  getQuarterList: state => state.quarterList,
  getSelectedQuarter: state => state.selectedQuarter,
  getYearList: state => state.yearList,
  getSelectedYearIndex: state => state.selectedYearIndex
}

const mutations = {
  setLoading(state, payload) {
    state.bLoading = payload
  },
  setRestaurantID(state, payload) {
    state.restaurant_id = payload
  },
  setFirstOrderDate(state, payload) {
    state.firstOrderDate = payload
  },
  setSelectedQuarter(state, payload) {
    state.selectedQuarter = payload
  },
  setSelectedYearIndex(state, payload) {
    state.selectedYearIndex = payload
  },
  setMenuInfo(state, payload) {
    state.menuInfo = payload
  },
  setSalesInfo(state, payload) {
    state.salesInfo = payload
  },
  setSalesChartInfo(state, payload) {
    state.salesChartInfo = payload
  },
  setMenuSalesInfo(state, payload) {
    state.menuSalesInfo = payload
  },
  setMenuSalesInfoMenuID(state, payload){
    let menu_id = payload.menu_id,
        data = payload.data
    //this.$set(state.menuInfo[menu_id], 'sales', data)
    state.menuInfo[menu_id].sales = data
  },
  setMenuSalesChartInfo(state, payload) {
    state.menuSalesChartInfo = payload
  },
  setMenuSalesChartInfoMenuID(state, payload) {
    let menu_id = payload.menu_id,
        data = payload.data
    state.menuInfo[menu_id].chart = data
  },
  setLoadingMenuDetail(state, payload) {
    let menu_id = payload.menu_id,
        data = payload.data
    state.bLoadingMenuSales[menu_id] = data
  },
  setSelectYearIndexForMenu(state, payload) {
    let targetMenuID = payload.menu_id,
        dateIndex = payload.date_index

    if (targetMenuID in state.menuSalesInfo) {
      state.menuSalesInfo[targetMenuID].date_index = dateIndex
    }
  },
  createQuarterList(state, payload) {
    if (payload.end_date === null) {
      let dat = new Date()
      let h_date = new Date(dat.getTime() - (dat.getTimezoneOffset()*60000))
      payload.end_date = h_date.toISOString().split('T')[0]
    }
    state.quarterList = hDate.createQuarterList(payload.start_date, payload.end_date)
    state.selectedQuarter = state.quarterList[0]
  }
}

const actions = {
  [type.GET_MENU_INFO]({commit, state}) {
    state.bLoading = true
    api.async_call('getMenuInfo', '', null).then((result) =>
    {
      for (var obj in result.data.data) {
        let targetObj = result.data.data[obj]
        console.log('res_end_data: ', targetObj.end_date)
        result.data.data[obj]['panel'] = []
        let end_date = new Date(targetObj.end_date)
        let today = new Date()
        console.log('obj','end_date/today: ',obj, end_date, today)
        if (end_date > today && targetObj.sales_status === 1 ) {
          targetObj.end_date = '-'
        }
        result.data.data[obj].bLoadingMenuSales = false
      }
      commit('setMenuInfo', result.data.data)
      console.log('setMenuInfo: ', JSON.stringify(result.data.data))
      state.bLoading = false
    }).catch((error) => {
      console.log('error on sales API, ', error)
      state.loginFail = true
      state.bLoading = false
      commit('setAuthState', false)
      router.push('/')
    })
  },
  [type.GET_SALES_INFO]({commit, state}, payload) {
    let res_type = payload.res_type
    let start_date = payload.start_date
    let end_date = payload.end_date

    state.bLoading = true
    api.async_call('getSalesInfo', '', {
      '{res_type}': res_type,
      // '{restaurant_id}': state.restaurant_id,
      '{start_date}': start_date,
      '{end_date}': end_date
    }).then((result) => {
      //returned data is not array. transform the data into array
      let salesData = {}
      let salesChart = {}

      let item = result.data.data
      item['panel'] = []
      item['total_sales_revenue'] = Math.round(
        item['total_sales_revenue'] * Math.pow(10,2)
      ) / Math.pow(10,2)
      item['promotion_discount'] = Math.round(
        item['promotion_discount'] * Math.pow(10,2)
      ) / Math.pow(10,2)
      salesData = item
      salesChart = {
        labels : [
          state.selectedQuarter.chart_label1,
          state.selectedQuarter.chart_label2,
          state.selectedQuarter.chart_label3,
        ],
        datasets : [
          {
            label: 'MENU ',
            backgroundColor: '#ffb700',
            barThickness: 30,
            data: item.label
          }
        ]
      }
      commit('setSalesChartInfo', salesChart)
      commit('setSalesInfo', salesData)
      state.bLoading = false
    }).catch((error) => {
      console.log('error on sales API, ', error)
      state.loginFail = true
      state.bLoading = false
      commit('setAuthState', false)
      router.push('/')
    })
  },
  [type.GET_SALES_INFO_PER_MENU]({commit, state}, payload) {
    let res_type = payload.res_type
    let start_date = payload.start_date
    let end_date = payload.end_date

    state.bLoading = true
    api.async_call('getSalesInfoperMenu', '', {
      '{res_type}': res_type,
      // '{restaurant_id}': state.restaurant_id,
      '{start_date}': start_date,
      '{end_date}': end_date
    }).then((result) => {
      //returned data is not array. transform the data into array
      let salesArray = []
      let salesChart = {}
      // let menu_index = 0
      for (let key in result.data.data) {
        let item = result.data.data[key]
        // menu_index += 1
        item['panel'] = []
        item['date_index'] = 0
        item['total_sales_revenue'] = Math.round(
          item['total_sales_revenue'] * Math.pow(10,2)
        ) / Math.pow(10,2)
        item['promotion_discount'] = Math.round(
          item['promotion_discount'] * Math.pow(10,2)
        ) / Math.pow(10,2)
        salesArray.push(item)
        salesChart[key] = {
          labels : state.yearList[state.selectedYearIndex].chart_label,
          datasets : [
            {
              label: 'MENU ',
              backgroundColor: '#ffb700',
              barThickness: 20,
              data: item.label
            }
          ]
        }
      }
      console.log('salesChart: ', JSON.stringify(salesChart))
      console.log('state.createYearList.chart_label: ', JSON.stringify(state.yearList[state.selectedYearIndex].chart_label))
      commit('setMenuSalesChartInfo', salesChart)
      commit('setMenuSalesInfo', salesArray)
      state.bLoading = false
    }).catch((error) => {
      console.log('error on sales API, ', error)
      state.loginFail = true
      state.bLoading = false
      commit('setAuthState', false)
      router.push('/')
    })
  },
  [type.GET_SINGLE_MENU_SALES_INFO]({commit, state}, payload) {
    let res_type = payload.res_type
    let start_date = payload.start_date
    let end_date = payload.end_date
    let menu_id = payload.menu_id

    console.log('start_date: ', start_date, ' end_date: ', end_date)
    state.menuInfo[menu_id].bLoadingMenuSales = true
    api.async_call('getMenuSales', '', {
      '{menu_id}': menu_id,
      '{res_type}': res_type,
      '{start_date}': start_date,
      '{end_date}': end_date
    }).then((result) => {
      //returned data is not array. transform the data into array
      for (let key in result.data.data) {
        let temp_data = result.data.data[key]
        let item = chart.transformMenuSalesList(start_date, end_date, temp_data)
        item.date_index = item.target_year.length - 1
        console.log('menusalesinfo item: ', item)
        commit('setMenuSalesInfoMenuID',{menu_id:key, data:item})
        // state.menuSalesInfo[key] = item
        // state.menuSalesInfo[key]['panel'] = []
        // state.menuSalesInfo[key]['date_index'] = item.target_year.length - 1
        commit('setMenuSalesChartInfoMenuID', {menu_id:key, data:chart.createMenuSalesChart(item.data)})
        //state.menuSalesChartInfo[key] = chart.createMenuSalesChart(item.data)
        // item['date_index'] = date_index
        // item['total_sales_revenue'] = Math.round(
        //   item['total_sales_revenue'] * Math.pow(10,2)
        // ) / Math.pow(10,2)
        // item['promotion_discount'] = Math.round(
        //   item['promotion_discount'] * Math.pow(10,2)
        // ) / Math.pow(10,2)

        // salesChart[key] = {
        //   labels : state.yearList[state.selectedYearIndex].chart_label,
        //   datasets : [
        //     {
        //       label: 'MENU ' + menu_index,
        //       backgroundColor: '#ffb700',
        //       barThickness: 20,
        //       data: item.label
        //     }
        //   ]
        // }
      }
      // console.log('salesChart: ', JSON.stringify(state.menuSalesChartInfo))
      // console.log('menuSalesInfo: ', JSON.stringify(state.menuInfo))
      // console.log('state.bLoadingMenuSales: ', JSON.stringify(state.bLoadingMenuSales))
      commit('setLoadingMenuDetail', {menu_id:menu_id, data:false})
      state.menuInfo[menu_id].bLoadingMenuSales = false
      // console.log('state.bLoadingMenuSales2: ', JSON.stringify(state.bLoadingMenuSales))
    }).catch((error) => {
      console.log('error on sales API, ', error)
      state.loginFail = true
      state.menuInfo[menu_id].bLoadingMenuSales = false
      commit('setAuthState', false)
      router.push('/')
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
