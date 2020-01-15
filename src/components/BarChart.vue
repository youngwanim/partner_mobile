<template>
  <div >
  <v-card class="pa-4 ma-4">
    <BarChart :chartData="datacollection"></BarChart>
    <v-card-actions>
      <v-btn @click="fillData()">Randomize</v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
  import BarChart from './charts/Bar.js'

  export default {
    components: {
      BarChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['1', '2', '3','4','5','6','7'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#007979',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data two',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data three',
              backgroundColor: '#000079',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
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
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
