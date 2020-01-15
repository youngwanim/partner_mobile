<template>
  <div class="quarter_info">
    <div class="text-center" v-if="getLoading">
      <v-progress-circular
        indeterminate
        color="amber"
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-card class="ma-4">
        <v-card-title class=" subtitle-1 amber--text text--darken-3 font-weight-black">Sales report</v-card-title>
        <v-divider class="ml-4 mr-4"></v-divider>
        <v-row justify="end">
          <v-col cols="7"
            md="2">
            <v-select class="quarter-select mr-4"
              v-model="currentQuarter"
              :items="getQuarterList"
              item-text="label"
              @change="quarterSelect"
              return-object
              min-height="23"
              dense
              outlined
            ></v-select>
          </v-col>
        </v-row>
        <BarSalesCount :width="274" :height="144" :chartdata="getSalesChartInfo"></BarSalesCount>
        <v-card-text class="pb-5 font-weight-bold">
           <v-list dense>
              <template>
                <v-list-item  class="pl-0 pr-0">
                  <v-list-item-content class="grey--text text--darken-1">Total # of dishes sold</v-list-item-content>
                  <v-list-item-content><p class="text-right mb-0 grey--text text--darken-1">¥{{getSalesInfo.total_sales_count}} dish(es)</p></v-list-item-content>
                </v-list-item>
                <v-list-item  class="pl-0 pr-0">
                  <v-list-item-content class="grey--text text--darken-1">Promotional discount</v-list-item-content>
                  <v-list-item-content><p class="text-right mb-0 deep-orange--text text-accent-4">-¥{{getSalesInfo.promotion_discount}}</p></v-list-item-content>
                </v-list-item>
                <v-list-item  class="pl-0 pr-0">
                  <v-list-item-content>Total sales revenue</v-list-item-content>
                  <v-list-item-content><p class="text-right mb-0">¥{{getSalesInfo.total_sales_revenue}}</p></v-list-item-content>
                </v-list-item>
                <v-list-item  class="pl-0 pr-0 grey--text">
                  <v-list-item-content class="grey--text text--darken-1">Profit share (5%)</v-list-item-content>
                  <v-list-item-content><p class="text-right mb-0 grey--text text--darken-1">¥{{getSalesInfo.total_sales_revenue * 0.05}}</p></v-list-item-content>
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
      this.GET_SALES_INFO({
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
        'getSalesInfo',
        'getSalesChartInfo',
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
        'GET_SALES_INFO'
      ]),
      quarterSelect (value) {
        this.setSelectedQuarter(this.currentQuarter)
        this.GET_SALES_INFO({
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

<style lang="scss">

  .v-select__selections {
    input { display: none}
    .v-select__selection {
      font-size: 9px;
    }
    .v-select__selection--comma{
      margin: 0;
    }
  }
  .v-text-field__details{
    display:none;
  }
  .quarter_info {
    text-align: left;
    .quarter-select {
      &.v-text-field--outlined,&.v-input--dense,&.v-text-field--outlined{
        .v-input__control {
          .v-input__slot {
            min-height: 20px;
          }
        }
      }
    }
  }
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
