import api from '@/api/api.js'

const type = {
  GET_SALES_INFO: 'GET_SALES_INFO',
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
      label: '%{yearl} NOV - %{yearr} JAN',
      start_date: '%{yearl}-11-01',
      end_date: '%{yearr}-01-31',
      chart_label1: '%{yearl}.11',
      chart_label2: '%{yearl}.12',
      chart_label3: '%{yearr}.01'
    },
    {
      label: '%{yearl} FEB - %{yearr} APR',
      start_date: '%{yearl}-02-01',
      end_date: '%{yearr}-04-30',
      chart_label1: '%{yearl}.02',
      chart_label2: '%{yearl}.03',
      chart_label3: '%{yearl}.04'
    },
    {
      label: '%{yearl} MAY - %{yearr} JUL',
      start_date: '%{yearl}-05-01',
      end_date: '%{yearr}-07-31',
      chart_label1: '%{yearl}.05',
      chart_label2: '%{yearl}.06',
      chart_label3: '%{yearl}.07'
    },
    {
      label: '%{yearl} AUG - %{yearr} OCT',
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
  salesInfo: [],
  salesChartInfo: {},
  firstOrderDate: '',
  selectedQuarter: {}
}

const getters = {
  getLoading: state => state.bLoading,
  getSalesInfo: state => state.salesInfo,
  getSalesChartInfo: state => state.salesChartInfo,
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
  setSalesInfo(state, payload) {
    state.salesInfo = payload
  },
  setSelectedQuarter(state, payload) {
    state.selectedQuarter = payload
  },
  setSalesChartInfo(state, payload) {
    state.salesChartInfo = payload
  },
  createQuarterList(state) {
    let d = new Date()
    let startMonth = d.getMonth()
    let startYear = d.getFullYear()
    let startQuarter = getQuarter(startMonth)
    if (startQuarter === 0){
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
      '{restaurant_id}': state.restaurant_id,
      '{start_date}': start_date,
      '{end_date}': end_date
    }).then((result) => {
      console.log(result.data)
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
      commit('setSalesChartInfo', salesChart)
      commit('setSalesInfo', salesArray)
      state.bLoading = false
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
