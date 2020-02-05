import Chart from 'chart.js'
import { HorizontalBar } from 'vue-chartjs'
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels'


export default {
  extends: HorizontalBar,
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
              beginAtZero: true,
              suggestedMax: 140
            },
            gridLines: {
              display: true
            },
            stacked: true
          }],
          xAxes: [ {
            gridLines: {
              display: false
            },
            stacked: true
          }]
        },
        legend: {
          display: false
        },
        layout: {
            padding: {
                left: 26,
                right: 26,
                top: 30
            }
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
        maintainAspectRatio: true,
        aspectRatio: 1
      }
    }
  },
  mounted () {
    let maxSuggested = 10
    let maxValue = 0
    if (this.chartdata){
      maxValue = Math.max(...this.chartdata.datasets[0].data)
    }

    if (maxValue > 0) {
      maxSuggested = Math.ceil(maxValue * 5 / 4)
      maxSuggested -= maxSuggested%10
    }
    this.options.scales.yAxes[0].ticks.suggestedMax = maxSuggested
    console.log('maxValue from data: ', maxValue, maxSuggested)
    console.log('chartdata: ', JSON.stringify(this.chartdata))
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    //Chart.defaults.global.plugins.datalabels.display = false;
    Chart.plugins.register(ChartJsPluginDataLabels);

    this.renderChart(this.chartdata, this.options)
  }
}
