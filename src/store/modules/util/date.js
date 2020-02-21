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

function createLabelwithYear (year) {
  let retObj = {}
  let yearTemplate = {
      label: '%{year}',
      start_date: '%{year}-01-01',
      end_date: '%{year}-12-31',
      chart_label: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT','NOV','DEC']
  }

  for (let key in yearTemplate) {
    if (yearTemplate[key].constructor === Array){
      let arr = yearTemplate[key]
      for (let i=0;i<arr.length;i++){
        arr[i] = arr[i].replace('%{year}', year)
      }
      retObj[key] = arr
    } else{
      retObj[key] = yearTemplate[key].replace('%{year}', year)
    }
  }
  return retObj
}


function createYearList(start_date, end_date) {
  let lastOrderDateObj = new Date(end_date)
  let startYear = lastOrderDateObj.getFullYear()
  let firstOrderDateObj = new Date(start_date)
  let endYear = firstOrderDateObj.getFullYear()
  let yearList = []

  do {
    yearList.push(createLabelwithYear(startYear))
    if (startYear === endYear) {
      break
    } else {
      startYear -= 1
    }
  } while (!(startYear === endYear))
  console.log('mutation/createYearList: ', JSON.stringify(yearList))

  return yearList
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
      chart_label3: '%{yearr}.01',
      chart_label: ['%{yearl}.11', '%{yearl}.12', '%{yearr}.01']
    },
    {
      label: '%{yearl}.02 ~ %{yearr}.04',
      start_date: '%{yearl}-02-01',
      end_date: '%{yearr}-04-30',
      chart_label1: '%{yearl}.02',
      chart_label2: '%{yearl}.03',
      chart_label3: '%{yearl}.04',
      chart_label: ['%{yearl}.02', '%{yearl}.03', '%{yearl}.04']
    },
    {
      label: '%{yearl}.05 ~ %{yearr}.07',
      start_date: '%{yearl}-05-01',
      end_date: '%{yearr}-07-31',
      chart_label1: '%{yearl}.05',
      chart_label2: '%{yearl}.06',
      chart_label3: '%{yearl}.07',
      chart_label: ['%{yearl}.05', '%{yearl}.06', '%{yearl}.07']
    },
    {
      label: '%{yearl}.08 ~ %{yearr}.10',
      start_date: '%{yearl}-08-01',
      end_date: '%{yearr}-10-31',
      chart_label1: '%{yearl}.08',
      chart_label2: '%{yearl}.09',
      chart_label3: '%{yearl}.10',
      chart_label: ['%{yearl}.08', '%{yearl}.09', '%{yearl}.10']
    }
  ]
  let retObj = {}
  //retObj.label = retObj.label.replace('%{yearl}', leftYear.toString())
  for (let key in quarterTemplate[quarter]) {
    if (quarterTemplate[quarter][key].constructor === Array){
      let arr = quarterTemplate[quarter][key]
      for (let i=0;i<arr.length;i++){
        arr[i] = arr[i].replace('%{yearl}', leftYear)
        .replace('%{yearr}', rightYear)
      }
      retObj[key] = arr
    } else{
      retObj[key] = quarterTemplate[quarter][key]
        .replace('%{yearl}', leftYear)
        .replace('%{yearr}', rightYear)
    }
  }
  return retObj
}

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

function createQuarterList(start_date, end_date) {
  let quarterList = []
  let d = new Date(end_date)
  let startMonth = d.getMonth()
  let startYear = d.getFullYear()
  let startQuarter = getQuarter(startMonth)
  if (startQuarter === 0 && startMonth !== 0){
    startYear += 1
  }

  let firstOrderDateObj = new Date(start_date)
  let firstOrderMonth = firstOrderDateObj.getMonth()
  let endYear = firstOrderDateObj.getFullYear()
  let endQuarter = getQuarter(firstOrderMonth)

  do {
    quarterList.push(createLabelwithQuarter(startYear, startQuarter))
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
  //state.selectedQuarter = state.quarterList[0]
  return quarterList
}

module.exports = {
  createYearList,
  createLabelwithQuarter,
  createQuarterList
};
