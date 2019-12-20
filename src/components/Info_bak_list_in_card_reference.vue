<template>
  <div class="partner_info">
    <v-select class="ma-4"
          v-model="currentQuarter"
          :items="quarterList"
          item-text="label"
          label="Select Quarter"
        ></v-select>
  <v-card v-for="(item_menu, index_menu) in ex_menuStatus"
    v-bind:key="index_menu" class="pa-1 ma-4">
    <v-card-title class="amber--text text--darken-3 font-weight-bold">MENU 1{{item_menu.menu_id}}{{index_menu}}</v-card-title>
    <v-card-text>
      <v-list>
        <v-divider></v-divider>
         <template v-for="(item, index) in ex_menuStatus">
           <v-list-item  three-line
             :key="item.id"
           >
             <v-list-item-avatar>
               <v-img :src="'http://viastelle-main.oss-cn-shanghai.aliyuncs.com/' + item.image_thumbnail"></v-img>
             </v-list-item-avatar>

             <v-list-item-content>
               <v-list-item-subtitle v-html="item.menu_name"></v-list-item-subtitle>
               <v-list-item-subtitle v-html="item.menu_name_cn"></v-list-item-subtitle>
             </v-list-item-content>
           </v-list-item>
           <v-list-item
             :key="item.id"
           >
             <v-list-item-content max-height="30">
               <v-list-item-subtitle v-html="'price: ' + item.price"></v-list-item-subtitle>
             </v-list-item-content>
             <v-list-item-content max-height="30">
               <v-list-item-subtitle class="red--text" v-if="!item.sales_status" v-html="'not selling anymore'"></v-list-item-subtitle>
             </v-list-item-content>
           </v-list-item>
           <v-divider v-if="index < ex_menuStatus.length-1" :key="index"></v-divider>
         </template>
       </v-list>
     </v-card-text>
  </v-card>
  <v-card class="pa-1 ma-4">
    <v-card-title>MENU 2</v-card-title>
    <v-card-text>
      <v-list>
        <v-divider></v-divider>
         <template v-for="(item, index) in ex_menuStatus">
           <v-list-item  three-line
             :key="item.id"
           >
             <v-list-item-avatar>
               <v-img :src="'http://viastelle-main.oss-cn-shanghai.aliyuncs.com/' + item.image_thumbnail"></v-img>
             </v-list-item-avatar>

             <v-list-item-content>
               <v-list-item-subtitle v-html="item.menu_name"></v-list-item-subtitle>
               <v-list-item-subtitle v-html="item.menu_name_cn"></v-list-item-subtitle>
             </v-list-item-content>
           </v-list-item>
           <v-list-item
             :key="item.id"
           >
             <v-list-item-content max-height="30">
               <v-list-item-subtitle v-html="'price: ' + item.price"></v-list-item-subtitle>
             </v-list-item-content>
             <v-list-item-content max-height="30">
               <v-list-item-subtitle class="red--text" v-if="!item.sales_status" v-html="'not selling anymore'"></v-list-item-subtitle>
             </v-list-item-content>
           </v-list-item>
           <v-divider v-if="index < ex_menuStatus.length-1" :key="index"></v-divider>
         </template>
       </v-list>
     </v-card-text>
  </v-card>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data () {
      return {
        currentQuarter: null,
        datacollection: null,
        quarter: [
          {
            index: 0,
            month: [10,11,0]

          },
          {
            index: 1,
            month: [1,2,3] //2월~4월
          },
          {
            index: 2,
            month: [4,5,6]
          },
          {
            index: 3,
            month: [7,8,9]
          }
        ],
        months: [
          'JAN',
          'FEB',
          'MAR',
          'APR',
          'MAY',
          'JUN',
          'JUL',
          'AUG',
          'SEP',
          'OCT',
          'NOV',
          'DEC'
        ],
        targetYear: 2019,
        quarterList: [],
        ex_menuStatus: [
          {
            menu_id: 82,
            menu_name: 'Eggplant Fried Rice with Lotus root Tteok-galbi',
            menu_name_cn: '茄子炒饭配莲藕牛肉饼',
            image_thumbnail: 'bumps/fried/img_thumb_friedrice.jpg',
            price: 58,
            sales_status: true,
            sales_start_date: '2018-10-10',
            sales_end_date: '',
            total_sales_revenue: 100,
            total_sales_count: 200,
            promotion_discount: 100,
            labels: [],
            sales_detail: [
              40, 194, 0
            ]
          },
          {
            menu_id: 83,
            menu_name: 'Popeye Spinach Fried Rice with Pork Mushroom Bulgogi',
            menu_name_cn: '大力水手炒饭配猪肉炒蘑菇',
            image_thumbnail: 'bumps/popeye/img_thumb_popeye.jpg',
            price: 58,
            sales_status: true,
            sales_start_date: '2018-10-10',
            sales_end_date: '',
            total_sales_revenue: 100,
            total_sales_count: 200,
            promotion_discount: 100,
            labels: [],
            sales_detail: [
              40, 194, 200
            ]
          },
          {
            menu_id: 113,
            menu_name: 'Black bean sauce with shrimp & egg fried rice',
            menu_name_cn: '炸酱虾仁鸡蛋炒饭',
            image_thumbnail: 'bumps/bbsfried/img_thumb_blackbeansaucerice.jpg',
            price: 58,
            sales_status: true,
            sales_start_date: '2018-10-10',
            sales_end_date: '',
            total_sales_revenue: 100,
            total_sales_count: 200,
            promotion_discount: 100,
            labels: [],
            sales_detail: [
              0, 194, 100
            ]
          },
          {
            menu_id: 114,
            menu_name: 'Egg Fried Rice and Eggplant with Oyster Sauce',
            menu_name_cn: '蚝油炒茄子配鸡蛋炒饭',
            image_thumbnail: 'bumps/efroyster/img_thumb_eggricewitheggplant.jpg',
            price: 58,
            sales_status: false,
            sales_start_date: '2018-10-10',
            sales_end_date: '',
            total_sales_revenue: 100,
            total_sales_count: 200,
            promotion_discount: 100,
            labels: [],
            sales_detail: [
              40, 194, 200
            ]
          }

        ]
      }
    },
    computed: {

    },
    created () {
      this.currentQuarter = this.createQuarterList('2018-10-10')
    },
    mounted () {
      this.fillData()
      console.log(this.currentQuarter)
    },
    methods: {
      createLabelwithQuarter (year, quarter) {
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
            end_date: '%{yearr}-07-30',
            chart_label1: '%{yearl}.05',
            chart_label2: '%{yearl}.06',
            chart_label3: '%{yearl}.07'
          },
          {
            label: '%{yearl} AUG - %{yearr} OCT',
            start_date: '%{yearl}-08-01',
            end_date: '%{yearr}-10-30',
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
      },
      getQuarter(month) {
        let quarter = 0
        for (let i=0;i<this.quarter.length; i++) {
          if (this.quarter[i].month.includes(month)) {
            quarter = this.quarter[i].index
            break
          }
        }
        return quarter
      },
      createQuarterList (firstOrderDate) {
        let d = new Date()
        let startMonth = d.getMonth()
        let startYear = d.getFullYear()
        let startQuarter = this.getQuarter(startMonth)
        if (startQuarter === 0){
          startYear += 1
        }

        let firstOrderDateObj = new Date(firstOrderDate)
        let firstOrderMonth = firstOrderDateObj.getMonth()
        let endYear = firstOrderDateObj.getFullYear()
        let endQuarter = this.getQuarter(firstOrderMonth)

        do {
          this.quarterList.push(this.createLabelwithQuarter(startYear, startQuarter))
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
        return this.quarterList[0]
      },
      fillData () {
        this.datacollection = {
          labels: ['Red', 'Blue'],
          datasets: [
            {
              label: 'Egg Fried Rice',
              backgroundColor: '#f80000',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Black bean sauce',
              backgroundColor: '#00ff00',
              data: [this.getRandomInt(), this.getRandomInt()]
            },
            {
              label: 'Popeye Spinach Fried Rice',
              backgroundColor: '#000079',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Eggplant Fried Rice with Lotus root Tteok-galbi',
              backgroundColor: '#f0000f',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
        console.log(JSON.stringify(this.datacollection))
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .partner_info {
    text-align: left;
  }
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
