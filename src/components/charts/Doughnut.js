import Chart from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels'


export default {
  extends: Doughnut,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    charttext: {
      type: String
    }
  },
  data () {
    return {
      options: {
        // scales: {
        //   yAxes: [{
        //     ticks: {
        //       beginAtZero: true,
        //       suggestedMax: 140
        //     },
        //     gridLines: {
        //       display: false
        //     },
        //     stacked: true
        //   }],
        //   xAxes: [ {
        //     gridLines: {
        //       display: false
        //     },
        //     stacked: false
        //   }]
        // },
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
                        color: '#ffffff'
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 60,
        elements: {
          center: {
            text: ['0000','dishes'],
            color: ['#333333', '#333333'], //Default black
            fontSize: [20, 15],
            fontWeight: [700, 100],
            //fontStyle: ['700 20px DNIPro','100 15px DNIPro'], //Default Arial
            fontStyle: ['DNIPro','DNIPro'], //Default Arial
            linePadding: 5,
            sidePadding: 15 //Default 20 (as a percentage)
          }
        }
        //aspectRatio: 1
      }
    }
  },
  mounted () {
    this.renderTheChart()
  },
  methods: {
    renderTheChart() {
      //change options datalabels if data is null
      // console.log('chartdata: ',this.chartdata.datasets)
      if (this.chartdata.datasets[0].data.length === 0) {
        this.chartdata.datasets[0].data.push(-1)
        this.options.plugins.datalabels.labels.title.color = '#ffffff'
      } else{
        this.options.plugins.datalabels.labels.title.color = '#000000'
      }
      this.options.elements.center.text[0] = this.charttext
      Chart.plugins.register(ChartJsPluginDataLabels);
      Chart.plugins.register({
        beforeDraw: function (chart) {
          if (chart.config.options.elements.center) {
            var ctx = chart.chart.ctx;
            //Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            //var fontStyle = centerConfig.fontStyle || 'Arial';
            var fontStyle = centerConfig.fontStyle;
            var txt = centerConfig.text;
            //var color = centerConfig.color || '#000';
            var color = centerConfig.color;
            var fontSize = centerConfig.fontSize;
            var fontWeight = centerConfig.fontWeight;
            var linePadding = centerConfig.linePadding;
            // var sidePadding = centerConfig.sidePadding || 20;
            // var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
            //Start with a base font of 30px
            var lines = chart.config.options.elements.center.text.length
            var totalHeight = fontSize.reduce(function(sum, item){sum += item; return sum}, 0) + ((lines-1)*linePadding)
            var fontYPos = ((chart.chartArea.top + chart.chartArea.bottom) / 2) - (totalHeight/2);
            // console.log('totalHeight: ', totalHeight)
            for (let i=0;i<lines;i++) {
              ctx.font = "40px " + fontStyle[i];
              // var stringWidth = ctx.measureText(txt[i]).width;
              // var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
              // var widthRatio = elementWidth / stringWidth;
              // var newFontSize = Math.floor(20 * widthRatio);
              // var elementHeight = (chart.innerRadius * 2);
              //var fontSizeToUse = Math.min(newFontSize, elementHeight);
              // console.log('fontsize: ',i , newFontSize, elementHeight, fontSizeToUse)
              // console.log('fontstyle: ', i, fontStyle[i])
              //lineheight = fontSizeToUse = 15
              ctx.textAlign = 'center';
              //ctx.textBaseline = 'middle';
              ctx.textBaseline = 'bottom';
              var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
              // var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
              //ctx.font = fontSizeToUse+"px " + fontStyle[i];
              ctx.font = fontWeight[i] + ' ' + fontSize[i]+'px '+fontStyle[i];
              fontYPos += fontSize[i]
              // console.log('font: ', i, ctx.font, centerY, fontYPos)
              ctx.fillStyle = color[i];

              ctx.fillText(txt[i], centerX, fontYPos);
              fontYPos += linePadding
            }
          }
        }
      })
      this.renderChart(this.chartdata, this.options)
    }
  },
  watch: {
    chartdata: function (){
      //this._chart.destroy()
      this.renderTheChart()
    }
  }
}
