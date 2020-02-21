<template>
  <div >
  <v-card class="pa-4 ma-4">
    <DoughnutChart :chartdata="datacollection"></DoughnutChart>
    <v-card-actions>
      <v-btn @click="fillData()">Randomize</v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
  import DoughnutChart from './charts/Doughnut.js'

  export default {
    components: {
      DoughnutChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    created () {
      this.fillData()
    },
    mounted () {
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['JAN', 'FEB', 'MAR'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: ['#ff8400','#f39e15','#ffbb0e','#ffd569'],
              barThickness: 10,
              categoryPercentage: 1,
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            },
            // {
            //   label: 'Data two',
            //   backgroundColor: '#f87979',
            //   barThickness: 10,
            //   categoryPercentage: 0.1,
            //   data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            // }, {
            //   label: 'Data three',
            //   backgroundColor: '#000079',
            //   barThickness: 10,
            //   categoryPercentage: 0.1,
            //   data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            // }
          ]
        }
        // console.log(JSON.stringify(this.datacollection))
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
