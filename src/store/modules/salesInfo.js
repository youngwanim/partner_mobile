import router from '@/router'
import api from '@/api/api.js'

const type = {
  GET_SALES_INFO: 'GET_SALES_INFO',
  GET_SALES_INFO_PER_MENU: 'GET_SALES_INFO_PER_MENU'
}

const quarterRef = [
  {
    index: 0,
    month: [10,11,0]

  },
  {
    index: 1,
    month: [1,2,3]
  },
  {
    index: 2,
    month: [4,5,6]
  },
  {
    index: 3,
    month: [7,8,9]
  }
]

function getQuarter(month) {
  let quarter = 0
  for (let i=0;i<quarterRef.length; i++) {
    if (quarterRef[i].month.includes(month)) {
      quarter = quarterRef[i].index
      break
    }
  }
  return quarter
}

function createLabelwithQuarter (year, quarter) {
  let leftYear = year, rightYear = year
  if (quarter === 0) {
    leftYear -= 1
  }
  leftYear = leftYear.toString()
  rightYear = rightYear.toString()

  let quarterTemplate = [
    {
      label: '%{yearl}.11 ~ %{yearr}.01',
      start_date: '%{yearl}-11-01',
      end_date: '%{yearr}-01-31',
      chart_label1: '%{yearl}.11',
      chart_label2: '%{yearl}.12',
      chart_label3: '%{yearr}.01'
    },
    {
      label: '%{yearl}.02 ~ %{yearr}.04',
      start_date: '%{yearl}-02-01',
      end_date: '%{yearr}-04-30',
      chart_label1: '%{yearl}.02',
      chart_label2: '%{yearl}.03',
      chart_label3: '%{yearl}.04'
    },
    {
      label: '%{yearl}.05 ~ %{yearr}.07',
      start_date: '%{yearl}-05-01',
      end_date: '%{yearr}-07-31',
      chart_label1: '%{yearl}.05',
      chart_label2: '%{yearl}.06',
      chart_label3: '%{yearl}.07'
    },
    {
      label: '%{yearl}.08 ~ %{yearr}.10',
      start_date: '%{yearl}-08-01',
      end_date: '%{yearr}-10-31',
      chart_label1: '%{yearl}.08',
      chart_label2: '%{yearl}.09',
      chart_label3: '%{yearl}.10'
    }
  ]
  let retObj = {}
  //retObj.label = retObj.label.replace('%{yearl}', leftYear.toString())
  for (let key in quarterTemplate[quarter]) {
    retObj[key] = quarterTemplate[quarter][key]
      .replace('%{yearl}', leftYear)
      .replace('%{yearr}', rightYear)
  }
  return retObj
}


const state = {
  bLoading: false,
  restaurant_id: 12,
  quarterList: [],
  salesInfo: null,
  salesChartInfo: {},
  menuSalesInfo: null,
  menuSalesChartInfo: {},
  firstOrderDate: '',
  selectedQuarter: {}
}

const getters = {
  getLoading: state => state.bLoading,
  getSalesInfo: state => state.salesInfo,
  getSalesChartInfo: state => state.salesChartInfo,
  getMenuSalesInfo: state => state.menuSalesInfo,
  getMenuSalesChartInfo: state => state.menuSalesChartInfo,
  getRestaurantID: state => state.restaurant_id,
  getQuarterList: state => state.quarterList,
  getSelectedQuarter: state => state.selectedQuarter
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
  setSalesInfo(state, payload) {
    state.salesInfo = payload
  },
  setSalesChartInfo(state, payload) {
    state.salesChartInfo = payload
  },
  setMenuSalesInfo(state, payload) {
    state.menuSalesInfo = payload
  },
  setMenuSalesChartInfo(state, payload) {
    state.menuSalesChartInfo = payload
  },
  createQuarterList(state) {
    let d = new Date()
    let startMonth = d.getMonth()
    let startYear = d.getFullYear()
    let startQuarter = getQuarter(startMonth)
    if (startQuarter === 0 && startMonth !== 0){
      startYear += 1
    }

    let firstOrderDateObj = new Date(state.firstOrderDate)
    let firstOrderMonth = firstOrderDateObj.getMonth()
    let endYear = firstOrderDateObj.getFullYear()
    let endQuarter = getQuarter(firstOrderMonth)

    do {
      state.quarterList.push(createLabelwithQuarter(startYear, startQuarter))
      if (startYear === endYear && startQuarter === endQuarter) {
        break
      } else {
        startQuarter -= 1
        if (startQuarter < 0) {
          startYear -= 1
          startQuarter += 4
        }
      }
    } while (!(startYear === endYear && startQuarter === endQuarter))
    state.selectedQuarter = state.quarterList[0]
  }
}

const actions = {
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
      let menu_index = 0
      for (let key in result.data.data) {
        let item = result.data.data[key]
        menu_index += 1
        item['panel'] = []
        item['total_sales_revenue'] = Math.round(
          item['total_sales_revenue'] * Math.pow(10,2)
        ) / Math.pow(10,2)
        item['promotion_discount'] = Math.round(
          item['promotion_discount'] * Math.pow(10,2)
        ) / Math.pow(10,2)
        salesArray.push(item)
        salesChart[key] = {
          labels : [
            state.selectedQuarter.chart_label1,
            state.selectedQuarter.chart_label2,
            state.selectedQuarter.chart_label3,
          ],
          datasets : [
            {
              label: 'MENU ' + menu_index,
              backgroundColor: '#ffb700',
              barThickness: 30,
              data: item.label
            }
          ]
        }
      }
      console.log(JSON.stringify(salesArray))
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
