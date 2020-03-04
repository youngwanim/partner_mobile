const data_obj = {
    data: {'yearmonth': [], 'data': {}},
    getChart: function () {
      let salesChart = {
        'labels': [],
        'datasets' : [{
          'label': 'menu',
          'backgroundColor': ['#ff8400','#f39e15','#ffbb0e','#ffd569'],
          'barThickness' : 10,
          'categoryPercentage': 1,
          'data' : []
        }]
      }
      return Object.assign({}, salesChart)
    },
    getData: function () {
      return Object.assign({}, this.data)
    },
    getSalesData: function () {
      let tempObj = {}
      //this.data.yearmonth.push(target_yearmonth)
      tempObj['labels'] = this.getChart() //saleschart
      tempObj['menus'] = [] //[[{menu_name:'xx', menu_id: 00, dish_count:00}]]
      tempObj['sales_count'] = 0
      tempObj['order_count'] = 0
      tempObj['customer_count'] = 0
      tempObj['sales_revenue'] = 0
      tempObj['most_popular'] = {} //[{most_popular: true, menu_name: 'xx'}]

      return Object.assign({}, tempObj)
    }
}

function createTargetYearMonthArray(start_date, end_date) {
  let target_yearmonth = []
  let start = new Date(start_date)
  let start_year = start.getFullYear(),
      start_month = start.getMonth()
  let end = new Date(end_date)
  let end_year = end.getFullYear(),
      end_month = end.getMonth()
  let target = ''

  while(!(start_year === end_year && start_month === end_month)) {
    target = start_year + '-' + ('0' + (start_month + 1)).slice(-2);
    target_yearmonth.push(target)
    start_month += 1
    if (start_month >= 12) {
      start_month = 0
      start_year += 1
    }
  }
  target = start_year + '-' + ('0' + (start_month + 1)).slice(-2);
  target_yearmonth.push(target)

  return target_yearmonth
}
function createMonthMenuData(monthInfo, dateKey, data, index) {
  let chart = data_obj.getChart()
  //put chart
  for (let key in data.menus) {
    chart.labels.push(data.menus[key].name)
    chart.datasets[0].data.push(data.menus[key].sales_count[index])
    monthInfo.data[dateKey].menus.push(data.menus[key].name)
    monthInfo.data[dateKey].sales_count += data.menus[key].sales_count[index]
    monthInfo.data[dateKey].sales_revenue += data.menus[key].sales_revenue[index]
  }
  monthInfo.data[dateKey].labels = chart
  monthInfo.data[dateKey].order_count = data.summary.orders[index]
  monthInfo.data[dateKey].customer_count = data.summary.customers[index]
  monthInfo.data[dateKey].most_popular = {most_popular: false, menu_name: 'xx'}
}

function createSalesAnalysis(start_date, end_date, data){
  let monthInfo = data_obj.getData()
  monthInfo.yearmonth = createTargetYearMonthArray(start_date, end_date)
  console.log('monthInfo.yearmonth: ', monthInfo.yearmonth)
  for (let i=0; i<monthInfo.yearmonth.length; i++) {
    monthInfo.data[monthInfo.yearmonth[i]] = data_obj.getSalesData()
    createMonthMenuData(monthInfo, monthInfo.yearmonth[i], data, i)
  }
  return monthInfo
}

function transformMonthSalesList (start_date, end_date, data) {
  let res = {}
  res = createSalesAnalysis(start_date, end_date, data)

  return res
}

module.exports = {
  transformMonthSalesList
};
