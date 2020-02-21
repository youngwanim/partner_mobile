import Chart from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels'


export default {
  extends: Doughnut,
  props: {
    chartdata: {
      type: Object,
      default: null
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
                        color: '#ff8400'
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          center: {
            text: ['0000','dishes'],
            color: ['#333333', '#333333'], //Default black
            fontStyle: ['700 20px DNIPro','100 15px DNIPro'], //Default Arial
            sidePadding: 15 //Default 20 (as a percentage)
          }
        }
        //aspectRatio: 1
      }
    }
  },
  mounted () {
    this.renderTheChart()
    // let maxSuggested = 10
    // let maxValue = 0
    // if (this.chartdata){
    //   maxValue = Math.max(...this.chartdata.datasets[0].data)
    // }
    //
    // if (maxValue > 0) {
    //   maxSuggested = Math.ceil(maxValue * 5 / 4)
    //   maxSuggested -= maxSuggested%10
    // }
    // this.options.scales.yAxes[0].ticks.suggestedMax = maxSuggested
    // console.log('chartdata: ', JSON.stringify(this.chartdata))
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    //Chart.defaults.global.plugins.datalabels.display = false;
    // Chart.plugins.register(ChartJsPluginDataLabels);
    //
    // this.renderChart(this.chartdata, this.options)
  },
  methods: {
    renderTheChart() {
      // let maxSuggested = 10
      // let maxValue = 0
      // if (this.chartdata){
      //   maxValue = Math.max(...this.chartdata.datasets[0].data)
      // }
      //
      // if (maxValue > 0) {
      //   maxSuggested = Math.ceil(maxValue * 5 / 4)
      //   maxSuggested -= maxSuggested%10
      // }
      // this.options.scales.yAxes[0].ticks.suggestedMax = maxSuggested
      // console.log('chartdata: ', JSON.stringify(this.chartdata))
      // this.chartData is created in the mixin.
      // If you want to pass options please create a local options object
      //Chart.defaults.global.plugins.datalabels.display = false;
      Chart.plugins.register(ChartJsPluginDataLabels);
      Chart.plugins.register({
        beforeDraw: function (chart) {
          if (chart.config.options.elements.center) {
            //Get ctx from string
            var lineheight = 10;
            var ctx = chart.chart.ctx;

            //Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            //var fontStyle = centerConfig.fontStyle || 'Arial';
            var fontStyle = centerConfig.fontStyle;
            var txt = centerConfig.text;
            //var color = centerConfig.color || '#000';
            var color = centerConfig.color;
            var sidePadding = centerConfig.sidePadding || 20;
            var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
            //Start with a base font of 30px
            var lines = chart.config.options.elements.center.text.length

            for (let i=0;i<lines;i++) {
              ctx.font = "40px " + fontStyle[i];
              var stringWidth = ctx.measureText(txt[i]).width;
              var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
              var widthRatio = elementWidth / stringWidth;
              var newFontSize = Math.floor(20 * widthRatio);
              var elementHeight = (chart.innerRadius * 2);
              var fontSizeToUse = Math.min(newFontSize, elementHeight);
              console.log('fontsize: ',i , newFontSize, elementHeight, fontSizeToUse)
              console.log('fontstyle: ', i, fontStyle[i])
              lineheight = fontSizeToUse = 15
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
              var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
              //ctx.font = fontSizeToUse+"px " + fontStyle[i];
              ctx.font = fontStyle[i];
              console.log('font: ', i, ctx.font)
              ctx.fillStyle = color[i];
              ctx.fillText(txt[i], centerX, centerY-(lines*lineheight/2) + (lineheight*i) + (lineheight / 2) );
            }


            //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            // var stringWidth = ctx.measureText(txt).width;
            // var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            // Find out how much the font can grow in width.
            // var widthRatio = elementWidth / stringWidth;
            // var newFontSize = Math.floor(30 * widthRatio);
            // var elementHeight = (chart.innerRadius * 2);

            // Pick a new font size so it will not be larger than the height of label.
            //var fontSizeToUse = Math.min(newFontSize, elementHeight);

            //Set font settings to draw it correctly.
            // ctx.textAlign = 'center';
            // ctx.textBaseline = 'middle';
            // var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            // var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            // ctx.font = fontSizeToUse+"px " + fontStyle;
            // ctx.fillStyle = color;

            //Draw text in center
            // ctx.fillText(txt, centerX, centerY-10);
            // ctx.fillText(txt, centerX, centerY+10);
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
