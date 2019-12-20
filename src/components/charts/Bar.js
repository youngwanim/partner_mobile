import Chart from 'chart.js'
import { Bar } from 'vue-chartjs'
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels'


export default {
  extends: Bar,
  props: {
    chartdata: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: false
        },
        plugins: {
            datalabels: {
                align: 'end',
                anchor: 'end',
                labels: {
                    title: {
                        font: {
                            weight: 'bold'
                        },
                        color: '#ff8400'
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    //Chart.defaults.global.plugins.datalabels.display = false;
    Chart.plugins.register(ChartJsPluginDataLabels);

    this.renderChart(this.chartdata, this.options)
  }
}
