<template>
  <div class="quarter_info">
    <div class="text-center" v-if="getLoading">
      <v-progress-circular
        indeterminate
        color="amber"
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="6" class="pl-8">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Select target month"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date"
              @click:month="test_showpicker"
              no-title type="month"
              :allowed-dates="allowedDates"
              :min="minDate"
              :max="maxDate">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-card class="ma-4">
        <v-card-title class=" subtitle-1 amber--text text--darken-3 font-weight-black">Monthly menu sales</v-card-title>
        <v-divider class="ml-4 mr-4"></v-divider>
        <!-- <DoughnutChart :width="200" :height="400" :chartdata="monthSalesInfo.dataset"></DoughnutChart> -->
        <DoughnutChart class="ml-9 mr-9" :width="400" :height="300" :chartdata="getChartData()" :charttext="chartText"></DoughnutChart>
        <v-card-text class="pb-0 pt-0 font-weight-bold">
           <v-list dense>
              <template>
                <v-list-item v-for="(item, i) in getMonthSalesInfo.data[date].menus" :key="i" class="pl-0 pr-0">
                  <span class="dot" :style="getColor(i)"></span>
                  <v-list-item-content class="grey--text text--darken-1">{{item.menu_name}}</v-list-item-content>
                  <v-list-item-action><p class="text-right mb-0 grey--text text--darken-1">{{item.menu_count}} dish(es)</p></v-list-item-action>
                </v-list-item>
              </template>
            </v-list>
         </v-card-text>
      </v-card>
      <v-card class="ma-4 sales-analysis">
        <v-card-title class=" subtitle-1 amber--text text--darken-3 font-weight-black">Sales analysis</v-card-title>
        <v-divider class="ml-4 mr-4"></v-divider>
        <v-container fluid >
          <v-row class="pb-4 border-bottom ml-2 mr-2"
            align="center"
            justify="center">
            <v-col :cols="4" class="border-right pa-0">
              <v-card flat class="ma-0">
                <v-img class="ml-8 mr-8 mt-1 mb-1" src="/drawable-xxhdpi/ic_dish.png"></v-img>
                <div class="list-data-value" align="center">{{getMonthSalesInfo.data[date].sales_count}}</div>
                <div class="list-data-desc" align="center">dishes sold</div>
              </v-card>
            </v-col>
            <v-col :cols="4" class="border-right pa-0">
              <v-card flat class="ma-0">
                <v-img class="ml-8 mr-8 mt-1 mb-1" src="/drawable-xxhdpi/ic_order.png"></v-img>
                <div class="list-data-value" align="center">{{getMonthSalesInfo.data[date].order_count}}</div>
                <div class="list-data-desc" align="center">orders</div>
              </v-card>
            </v-col>
            <v-col :cols="4" class="pa-0">
              <v-card flat class="ma-0">
                <v-img class="ml-8 mr-8 mt-1 mb-1" src="/drawable-xxhdpi/ic_customer.png"></v-img>
                <div class="list-data-value" align="center">{{getMonthSalesInfo.data[date].customer_count}}</div>
                <div class="list-data-desc" align="center">customers</div>
              </v-card>
            </v-col>
          </v-row>
          <v-list class="pt-0 pb-0 pl-2 pr-2">
            <template>
              <v-list-item class="list-item-common list-price border-bottom pt-2 pb-2 pl-0 pr-0">
                <v-img max-width="31" class="ml-6 mr-6 mt-1 mb-1" src="/drawable-xxhdpi/ic_price.png"></v-img>
                <v-list-item-content class="grey--text text--darken-1 pt-0 pb-0">
                  <v-list class="pt-0 pb-0" dense>
                    <template>
                      <v-list-item dense class="list-data-value list-price-revenue pl-0 pr-0">
                        ¥ {{getMonthSalesInfo.data[date].sales_revenue}}
                      </v-list-item>
                      <v-list-item dense class="list-data-desc pl-0 pr-0">
                        Total sales revenue of the month
                      </v-list-item>
                    </template>
                  </v-list>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="list-item-common list-best pt-2 pb-2 pl-0 pr-0">
                <v-img max-width="31" class="ml-6 mr-6 mt-1 mb-1" src="/drawable-xxhdpi/ic_best.png"></v-img>
                <v-list-item-content class="grey--text text--darken-1 pt-0 pb-0">
                  <v-list class="pt-0 pb-0" dense>
                    <template>
                      <v-list-item dense class="list-data-desc list-best-title pl-0 pr-0">
                        Most popular menu of the month
                      </v-list-item>
                      <v-list-item dense disabled class="list-best-menu pl-0 pr-0">
                        Total sales revenue of the month
                      </v-list-item>
                    </template>
                  </v-list>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
  import DoughnutChart from './charts/Doughnut.js'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    components: {
      DoughnutChart
    },
    data () {
      return {
        bLoading: true,
        panel: [],
        currentQuarter: null,
        picker: new Date().toISOString().substr(0, 7),
        date: new Date().toISOString().substr(0, 7),
        bDateLoaded: false,
        menu: false,
        minDate: '2016-01',
        maxDate: '2020-03',
        chartText: '0000',
        monthSalesInfo: {
          date_label: '2019-11',
          dataset: {
            labels: ['JAN', 'FEB', 'MAR'],
            datasets: [
              {
                labels: 'Data One',
                backgroundColor: ['#ff8400','#f39e15','#ffbb0e','#ffd569'],
                barThickness: 10,
                categoryPercentage: 1,
                data: [70, 60, 50]
              }
            ],
          },
          dishInfo: [
            {menu_name:'Stir fried something', menu_count:1},
            {menu_name:'Stir fried else', menu_count:2},
            {menu_name:'Stir fried wtf', menu_count:3},
                ],
          dishSold: 0,
          dishOrder: 0,
          customerCount: 0,
          totalRevenue: 0,
          mostPopular: 0
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
        }
      }
    },
    created () {
      this.GET_MONTH_SALES_INFO({
        res_type: 'month',
        start_date: '2017-01-01',
        end_date: '2020-03-03'
      })
    },
    mounted () {
      this.minDate = this.getMonthSalesInfo.yearmonth[0]
      this.maxDate = this.getMonthSalesInfo.yearmonth[this.getMonthSalesInfo.yearmonth.length-1]
    },
    computed: {
      ...mapGetters('salesinfo', [
        'getLoading',
        'getMonthSalesInfo'
      ])
    },
    methods: {
      ...mapMutations('salesinfo', [
        'setSelectedQuarter',
        'setFirstOrderDate',
        'createQuarterList'
      ]),
      ...mapActions('salesinfo', [
        'GET_MONTH_SALES_INFO'
      ]),
      test_showpicker() {
        console.log(this.date)
      },
      allowedDates (val) {
        if (this.getMonthSalesInfo.yearmonth.indexOf(val) > -1) {
          console.log("allowedDates: ",val, true)
          return true
        }
        console.log("allowedDates: ",val, false)
        return false
      },
      // minDate () {
      //   console.log("minDate: ", this.getMonthSalesInfo.yearmonth[0])
      //   return this.getMonthSalesInfo.yearmonth[0]
      // },
      // maxDate () {
      //   console.log("maxDate: ", this.getMonthSalesInfo.yearmonth[this.getMonthSalesInfo.yearmonth.length-1])
      //   return this.getMonthSalesInfo.yearmonth[this.getMonthSalesInfo.yearmonth.length-1]
      // },
      getChartData () {
        console.log('getMonthSalesInfo: ', this.getMonthSalesInfo)
        if (!this.bDateLoaded) {
          this.date = this.getMonthSalesInfo.yearmonth[this.getMonthSalesInfo.yearmonth.length -1]
          this.bDateLoaded = true
        }
        this.chartText = this.getMonthSalesInfo.data[this.date].sales_count.toString()
        return this.getMonthSalesInfo.data[this.date].labels
      },
      getColor (i) {
        let g=127
        let rgb = 'rgb(255, {%g}, 0)'
        g += (21 * i)

        while (g > 255) {
          g -= 255
        }
        rgb = rgb.replace('{%g}', g.toString())
        return { backgroundColor: rgb}
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
  .border-right {
    border-right: 1px dashed #e5e5e5;
  }
  .border-bottom {
    border-bottom: 1px dashed #e5e5e5;
  }
  .dot {
    height: 25px;
    width: 25px;
    background-color: #ff8400;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
  }
  .sales-analysis{
    .list-data-value {
      font-size: 18px;
      font-weight: normal;
      min-height: 18px;
    }
    .list-data-desc {
      font-size: 10px;
      font-weight: bold;
      color: #333333;
      min-height: 10px;
    }
    .list-price {
      .list-price-revenue{
        font-size: 18px;
        min-height: 18px;
        margin-bottom: 7px;
      }
      .list-price-desc{
        font-size: 10px;
        min-height: 10px;
      }
    }
    .list-best {
      .list-best-title{
        margin-bottom: 7px;
      }
      .list-best-menu{
        font-size: 10px;
        color: #808080;
        min-height: 10px;
      }
    }
  }
</style>
