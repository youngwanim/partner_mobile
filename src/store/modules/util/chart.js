const month_label = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT','NOV','DEC']
const data_obj = {
    data: {'year': 1970, 'labels': null},
    getdata: function (target_year) {
      this.data['year'] = target_year
      this.data['labels'] = []
      this.data['sales_revenue'] = []
      this.data['sales_count'] = []
      this.data['promotion_discount'] = []
      this.data['total_sales_revenue'] = 0
      this.data['total_promotion_discount'] = 0
      this.data['total_sales'] = 0

      return Object.assign({}, this.data)
    }
}

function addTargetYear (year_list, data_list, target_year) {
  let str_target_year = target_year.toString()
  if (year_list.length > 0){
    if (year_list[year_list.length - 1] !== target_year) {
      year_list.push(target_year)
      data_list[str_target_year] = data_obj.getdata(target_year)
    }
  } else {
    year_list.push(target_year)
    data_list[str_target_year] = data_obj.getdata(target_year)
  }
}
function createMenuSalesChart (data) {
  let salesChart = {}
  for (let key in data) {
    let obj = data[key]
    salesChart[obj.year] = {
      'labels': obj.labels,
      'datasets' : [{
        'label': 'menu',
        'backgroundColor': '#ffb700',
        'barThickness' : 20,
        'data' : obj.sales_count
      }]
    }
  }
  return salesChart
}

function getSum(total, num){
  total = total + num
  total = Math.round(total * Math.pow(10,2)) / Math.pow(10,2)
  return total
}
function transformMenuSalesList (start_date, end_date, data) {
  /*
    {
     target_year: [2017, 2018],
     data:[
            {year:<>, labels:[], sales_revenue:[],
            sales_count:[], promotion_discount:[],
            total_sales_revenue: <>,
            promotion_discount: <>
            }
          ]
    }
  */
  let res = {'target_year': [], data: {}}
  let start = new Date(start_date)
  let start_year = start.getFullYear()
  let start_month = start.getMonth()
  let index = 0
  let target_year = start_year
  let target_month = start_month

  do {
    addTargetYear(res.target_year, res.data, target_year)
    let labelIndex = target_year.toString()
    /*res.data.findIndex(function(obj, index, arr){
      return obj.year === target_year
    })*/
    console.log('find index: ', labelIndex)
    if (labelIndex in res.data) {
      res.data[labelIndex].labels.push(month_label[target_month])
      res.data[labelIndex].sales_revenue.push(data['sales_revenue'][index])
      res.data[labelIndex].sales_count.push(data['sales_count'][index])
      res.data[labelIndex].promotion_discount.push(data['promotion_discount'][index])
    }
    index += 1
    target_month += 1
    if (target_month > 11) {
      target_month = 0
      target_year += 1
    }
  } while(index < data.label.length)

  for(let yearKey in res.data) {
    res.data[yearKey].total_sales = res.data[yearKey].sales_count.reduce(getSum,0)
    res.data[yearKey].total_sales_revenue = res.data[yearKey].sales_revenue.reduce(getSum,0)
    res.data[yearKey].total_promotion_discount = res.data[yearKey].promotion_discount.reduce(getSum,0)
    //clearFloatOfMenu(res.data[yearKey])
  }

  return res
}

// console.log(JSON.stringify(
//   transformMenuSalesList(
//     '2018-11-30',
//     '2019-05-20',
//     {sales_revenue: [1,2,3,4,5,6,7],
//       sales_count: [1,2,3,4,5,6,7],
//       promotion_discount: [1,2,3,4,5,6,7],
//       label: [1,2,3,4,5,6,7]
//     }
//   )
// ))


module.exports = {
  createMenuSalesChart,
  transformMenuSalesList
};
