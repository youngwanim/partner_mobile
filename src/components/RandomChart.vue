<template>
  <div >
  <v-card class="pa-4 ma-4">
    <LineChart :chartData="datacollection"></LineChart>
    <v-card-actions>
      <v-btn @click="fillData()">Randomize</v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
  import LineChart from './charts/Line.js'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      console.log('mounted')
      this.fillData()
    },
    methods: {
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
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
