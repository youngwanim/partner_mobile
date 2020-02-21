<template>
  <div class="menu_info">
    <div class="text-center" v-if="getLoading">
      <v-progress-circular
        indeterminate
        color="amber"
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-container fluid>
        <v-row justify="start">
          <v-col
            v-for="(item, key, index) in menuInfo"
            v-bind:key="index"
            class="pt-0 pb-4">
            <v-card class="pa-1"  min-height="200" min-width="300" max-width="360">
              <v-container fluid>
               <v-row justify="start">
                 <v-col
                   class="d-flex pt-0"
                   cols="12">
                   <v-row align="center">
                     <v-col v-bind:class="{'amber--text text--darken-3':(item.sales_status === 1), 'grey--text':(item.sales_status !== 1)}" class="font-weight-bold pt-0 pb-0" cols="8">{{item.name}}</v-col>
                     <v-col cols="4">
                       <v-btn depressed v-if="item.sales_status === 1" color="#b6ce28" class="font-weight-bold white--text">ON SALE</v-btn>
                       <v-btn depressed v-else color="#b3b3b3" class="font-weight-bold white--text overline">SALES END</v-btn>
                     </v-col>
                   </v-row>
                 </v-col>
               </v-row>
              </v-container>
              <v-divider></v-divider>
              <v-card-text class="pt-0 pb-5 font-weight-bold">
                <v-list dense>
                  <template>
                    <v-list-item  class="pl-0 pr-0">
                      <v-list-item-content class="grey--text text--darken-1">Sales start date</v-list-item-content>
                      <v-list-item-content><p class="text-right mb-0 grey--text text--darken-1">{{item.start_date}}</p></v-list-item-content>
                    </v-list-item>
                    <v-list-item  class="pl-0 pr-0">
                      <v-list-item-content class="grey--text text--darken-1">Sales end date</v-list-item-content>
                      <v-list-item-content><p class="text-right mb-0 grey--text text--darken-1">{{item.end_date}}</p></v-list-item-content>
                    </v-list-item>
                    <v-list-item  class="pl-0 pr-0 grey--text">
                      <v-list-item-content class="grey--text text--darken-1">Unit price</v-list-item-content>
                      <v-list-item-content><p class="text-right mb-0 grey--text text--darken-1">¥{{item.price}}</p></v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>
              </v-card-text>
              <div v-if="item.panel.length > 0 && 'sales' in item">
                <v-card-title class="pt-1 pb-0 subtitle-2 font-weight-black">SALES DETAIL</v-card-title>
                <v-divider class="mt-2 mb-4"></v-divider>
                <v-row justify="center">
                <v-btn text small @click="changeTargetYear(key, -1)" :disabled="leftTransitionDisable(key)"><v-icon color="darken-2">mdi-chevron-left</v-icon></v-btn>
                  <span>{{ getSelectedYear(key) }}</span>
                <v-btn text small @click="changeTargetYear(key, 1)" :disabled="rightTransitionDisable(key)"><v-icon color="darken-2">mdi-chevron-right</v-icon></v-btn>
                </v-row>
                <BarSalesCount v-bind:style="{ width: 300 + 'px', height: getGraphHeight(key) + 'px'}" :chartdata="item.chart[getSelectedYear(key)]"></BarSalesCount>
                <v-card-text class="pt-0 pb-5 font-weight-bold">
                 <v-list dense>
                    <template>
                      <v-list-item  class="pl-0 pr-0">
                        <v-list-item-content class="grey--text text--darken-1">Total # of dishes sold</v-list-item-content>
                        <v-list-item-content><p class="text-right mb-0 grey--text text--darken-1">{{item.sales.data[getSelectedYear(key)].total_sales}}</p></v-list-item-content>
                      </v-list-item>
                      <v-list-item  class="pl-0 pr-0">
                        <v-list-item-content class="grey--text text--darken-1">Promotional discount</v-list-item-content>
                        <v-list-item-content><p class="text-right mb-0 grey--text text--darken-1">{{item.sales.data[getSelectedYear(key)].total_promotion_discount}}</p></v-list-item-content>
                      </v-list-item>
                      <v-list-item  class="pl-0 pr-0 grey--text">
                        <v-list-item-content class="grey--text text--darken-1">Total sales revenue</v-list-item-content>
                        <v-list-item-content><p class="text-right mb-0 grey--text text--darken-1">¥{{item.sales.data[getSelectedYear(key)].total_sales_revenue}}</p></v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-list>
                </v-card-text>
              </div>
              <v-expansion-panels v-model="item.panel" multiple>
                <v-expansion-panel @click="loadMenuSalesInfo(key)" >
                  <v-expansion-panel-header class="orange--text font-weight-bold">{{detailTitle(item.panel)}}
                    <v-progress-circular
                      indeterminate
                      color="amber"
                      v-if="item.bLoadingMenuSales"
                    ></v-progress-circular>
                  </v-expansion-panel-header>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
  import BarSalesCount from './charts/HorizontalBar.js'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    components: {
      BarSalesCount
    },
    data () {
      return {
        bLoading: true,
        panel: [],
        currentYear: null,
        menuInfo: {},
        bLoadingSalesInfo: {},
        datacollection: {
          labels: ['2019.10', '2019.11', '2019.12'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#007979',
              data: [0, 1, 2]
            }, {
              label: 'Data two',
              backgroundColor: '#f87979',
              data: [0, 1, 2]
            }, {
              label: 'Data three',
              backgroundColor: '#000079',
              data: [0, 1, 2]
            }
          ]
        },
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
        dataCollections: {
          labels: ['2019.10', '2019.11','2019.12'],
          datasets: [
            {
              label: 'MENU 1',
              backgroundColor: '#ffb700',
              barThickness: 30,
              data: [177, 255, 155]
            }
          ]
        },
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
            ],
            panel: []
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
            ],
            panel: []
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
            ],
            panel: []
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
            ],
            panel: []
          }

        ]
      }
    },
    created () {
      this.setFirstOrderDate('2018-10-10')
      this.createYearList()
      this.currentYear = this.getYearList[0]
      this.GET_MENU_INFO()
    },
    mounted () {
      this.fillData()
    },
    watch: {
      getMenuInfo() {
        this.menuInfo = this.getMenuInfo
      },
      getLoadingSalesInfo() {
        this.bLoadingSalesInfo = this.getLoadingMenuSales
      }
    },
    computed: {
      ...mapGetters('salesinfo', [
        'getLoading',
        'getLoadingMenuSales',
        'getMenuInfo',
        'getMenuSalesChartInfo',
        'getRestaurantID',
        'getYearList'
      ])
    },
    methods: {
      ...mapMutations('salesinfo', [
        'setSelectYearIndexForMenu',
        'setFirstOrderDate',
        'createYearList'
      ]),
      ...mapActions('salesinfo', [
        'GET_MENU_INFO',
        'GET_SALES_INFO_PER_MENU',
        'GET_SINGLE_MENU_SALES_INFO'
      ]),
      loadingMenuSalesStatus (menu_id) {
        console.log('menu_id: ', menu_id)
        console.log('loading status: ', this.getLoadingMenuSales[menu_id])
        return this.getLoadingMenuSales[menu_id]
      },
      getGraphHeight(menu_id) {
        let target_year = this.getSelectedYear(menu_id)
        let barNum = this.menuInfo[menu_id].chart[target_year].labels.length
        console.log('getGraphHeight: ', parseInt(barNum * 500 /12 + 100))
        return parseInt(barNum * 500 /12 + 100).toString()
        //let res = 'width:"300px"; height:"' + parseInt(barNum * 500 /12 + 100) + '"'
        //return res
      },
      loadMenuSalesInfo (menu_id) {
        console.log('clicked_menu id@387/menuinfo: ', menu_id)
        if (!('sales' in this.getMenuInfo[menu_id])) {
          let end_date = this.getMenuInfo[menu_id].end_date
          if (end_date === '-') {
            let mod_date = new Date()
            end_date = mod_date.toISOString().split('T')[0]
          }
          this.GET_SINGLE_MENU_SALES_INFO({
            'res_type': 'month',
            'menu_id': menu_id,
            'start_date': this.getMenuInfo[menu_id].start_date,
            'end_date': end_date
          })
        }
      },
      changeTargetYear (menu_id, num) {
        let targetYearIndex = this.menuInfo[menu_id].sales.date_index + num

        if (targetYearIndex < 0) {
          targetYearIndex = 0
        }
        if (targetYearIndex >= this.menuInfo[menu_id].sales.target_year.length -1){
          targetYearIndex = this.menuInfo[menu_id].sales.target_year.length -1
        }
        this.menuInfo[menu_id].sales.date_index = targetYearIndex
        console.log('salesDateIndex: ',this.menuInfo[menu_id].sales.date_index,
          this.menuInfo[menu_id].sales.target_year[this.menuInfo[menu_id].sales.date_index])
        this.$forceUpdate()
      },
      rightTransitionDisable(menu_id) {
        if(this.menuInfo[menu_id].sales.date_index === this.menuInfo[menu_id].sales.target_year.length - 1){
          return true
        }
        return false
      },
      leftTransitionDisable(menu_id) {
        if(this.menuInfo[menu_id].sales.date_index === 0){
          return true
        }
        return false
      },
      getSelectedYear(menu_id) {
        if (!('sales' in this.menuInfo[menu_id])){
          return '2000'
        }
        let sales = this.menuInfo[menu_id].sales
        console.log('getSelectedYear: ', sales.target_year[sales.date_index].toString())
        return sales.target_year[sales.date_index].toString()
      },
      detailTitle (panel) {
        if (panel.length > 0) {
          return 'HIDE DETAILS'
        } else{
          return 'SHOW DETAILS'
        }
      },
      fillData () {
        this.datacollection = {
          labels: ['2019.10', '2019.11','2019.12'],
          datasets: [
            {
              label: 'MENU 1',
              backgroundColor: '#ffb700',
              barThickness: 30,
              data: [133, 255, 155]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .menu_info {
    text-align: left;
  }
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
