<template>
  <div class="menu_info">
    <v-select class="ma-4"
          v-model="currentQuarter"
          :items="getQuarterList"
          item-text="label"
          @change="quarterSelect"
          return-object
          label="Select Quarter"
          outlined
        ></v-select>
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
          v-for="(item, index) in getMenuSalesInfo"
          v-bind:key="index"
          class="pt-0 pb-0"
      >
    <v-card class="pa-1"  min-height="200" min-width="300" max-width="360">
      <!-- <v-list dense>
         <template>
           <v-list-item class="pl-3 amber--text text--darken-3 font-weight-bold">
             <v-list-item-content>
               <v-list-item-subtitle class="amber--text text--darken-3 font-weight-bold">{{item.menu_name}}</v-list-item-subtitle>
             </v-list-item-content>
             <v-list-item-action><v-btn depressed color="#b6ce28" class="font-weight-bold white--text">ON SALE</v-btn></v-list-item-action>
           </v-list-item>
         </template>
       </v-list> -->
       <v-container fluid>
         <v-row justify="start">
           <v-col
             class="d-flex pt-0"
             cols="12">
         <v-row align="center">
           <v-col class="amber--text text--darken-3 font-weight-bold pt-0 pb-0" cols="8">{{item.menu_name}} asdfsdfasdf</v-col>
           <v-col cols="4"><v-btn depressed color="#b6ce28" class="font-weight-bold white--text">ON SALE</v-btn></v-col>
         </v-row>
       </v-col>
         </v-row>
       </v-container>
      <v-card-title class="pb-1 subtitle-1 amber--text text--darken-3 font-weight-bold">{{item.menu_name}}</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pb-5 font-weight-bold">
         <v-list dense>
            <template>
              <v-list-item  class="pl-0 pr-0">
                <v-list-item-content>Total sales revenue</v-list-item-content>
                <v-list-item-content><p class="text-right mb-0">¥{{item.total_sales_revenue}}</p></v-list-item-content>
              </v-list-item>
              <v-list-item  class="pl-0 pr-0 grey--text" v-if="item.panel.length > 0">
                <v-list-item-content class="grey--text text--darken-1">Price</v-list-item-content>
                <v-list-item-content><p class="text-right mb-0 grey--text text--darken-1">¥{{item.price}}</p></v-list-item-content>
              </v-list-item>
              <v-list-item  class="pl-0 pr-0" v-if="item.panel.length > 0">
                <v-list-item-content class="grey--text text--darken-1">Total # of dishes sold</v-list-item-content>
                <v-list-item-content><p class="text-right mb-0 grey--text text--darken-1">¥{{item.total_sales_count}} dish(es)</p></v-list-item-content>
              </v-list-item>
              <v-list-item  class="pl-0 pr-0" v-if="item.panel.length > 0">
                <v-list-item-content class="grey--text text--darken-1">Promotional discount</v-list-item-content>
                <v-list-item-content><p class="text-right mb-0 deep-orange--text text-accent-4">-¥{{item.promotion_discount}}</p></v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
       </v-card-text>
       <div v-if="item.panel.length > 0">
         <v-card-title class="pt-1 pb-0 subtitle-2 font-weight-black">SALES DETAIL</v-card-title>
         <v-divider class="mb-2"></v-divider>
         <BarSalesCount :chartdata="getMenuSalesChartInfo[item.menu_id]"></BarSalesCount>
         <v-card-title class="pt-8 pb-0 subtitle-2 font-weight-black">PRODUCT INFO.</v-card-title>
         <v-divider></v-divider>
         <v-card-text class="pt-0">
            <v-list dense>
               <template>
                 <v-list-item  class="pl-0 pr-0">
                   <v-list-item-content class="grey--text text--darken-1 font-weight-bold">Sales start date</v-list-item-content>
                   <v-list-item-content><p class="grey--text text--darken-1 text-right mb-0 font-weight-bold">Sales end date</p></v-list-item-content>
                 </v-list-item>
                 <v-list-item  class="pl-0 pr-0">
                   <v-list-item-content><p class="text-left mb-0">{{item.sales_start_date}}</p></v-list-item-content>
                   <v-list-item-content><p class="text-right mb-0">{{item.sales_end_date}}</p></v-list-item-content>
                 </v-list-item>
               </template>
             </v-list>
          </v-card-text>
        </div>
        <v-expansion-panels v-model="item.panel" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header class="orange--text font-weight-bold">{{detailTitle(item.panel)}}</v-expansion-panel-header>
          </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
  </v-col>
    </v-row>
  </v-container>
    <v-card class="pa-1 ma-7" max-width="330">
      <v-card-title class="pb-1 subtitle-1 amber--text text--darken-3 font-weight-black">SUMMARY</v-card-title>
      <v-card-text class="pb-1 font-weight-bold">
         <v-list dense>
            <template>
              <v-list-item  class="pl-0 pr-0">
                <v-list-item-content>Payment total</v-list-item-content>
                <v-list-item-content><p class="text-right mb-0">¥dd</p></v-list-item-content>
              </v-list-item>
              <v-list-item  class="pl-0 pr-0 ">
                <v-list-item-content>Profit share (5%)</v-list-item-content>
                <v-list-item-content><p class="text-right mb-0">¥333</p></v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
       </v-card-text>
    </v-card>
    </div>
  </div>
</template>

<script>
  import BarSalesCount from './charts/Bar.js'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    components: {
      BarSalesCount
    },
    data () {
      return {
        bLoading: true,
        panel: [],
        currentQuarter: null,
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
      this.createQuarterList()
      this.currentQuarter = this.getQuarterList[0]
      this.GET_SALES_INFO_PER_MENU({
        res_type: 'month',
        start_date: this.currentQuarter.start_date,
        end_date: this.currentQuarter.end_date
      })
    },
    mounted () {
      this.fillData()
    },
    computed: {
      ...mapGetters('salesinfo', [
        'getLoading',
        'getMenuSalesInfo',
        'getMenuSalesChartInfo',
        'getRestaurantID',
        'getQuarterList',
        'getSelectedQuarterListIndex'
      ]),
    },
    methods: {
      ...mapMutations('salesinfo', [
        'setSelectedQuarter',
        'setFirstOrderDate',
        'createQuarterList'
      ]),
      ...mapActions('salesinfo', [
        'GET_SALES_INFO_PER_MENU'
      ]),
      quarterSelect (value) {
        this.setSelectedQuarter(this.currentQuarter)
        this.GET_SALES_INFO_PER_MENU({
          res_type: 'month',
          start_date: value.start_date,
          end_date: value.end_date
        })
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
