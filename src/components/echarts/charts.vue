<template>
  <div class="zg-charts" ref="toChart" :style="style">
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {util} from '../../utils'
  // todo 对图表grid进行自适应计算
  export default {
    name: 'zgCharts',
    props: {
      /**
       * @description 图表宽度，默认自适应
       */
      width: {
        type: Number
      },
      /**
       * @description 图表高度
       */
      height: {
        type: Number,
        default: 400
      },
      /**
       * @description 图表类型
       */
      type: {
        type: String,
        default: 'bar',
        validator (value) {
          return ['bar', 'line'].includes(value)
        }
      },
      /**
       * @description 图表数据源
       */
      store: {
        type: Object,
        validator (store) {
          return store && util.isArray(store.series) && util.isArray(store.x_axis)
        }
      },
      /**
       * @description tooltip自定义显示
       */
      tooltipFormatter: {
        type: Function
      },
      /**
       * @description 显示数据项（从store中过滤），对应series中的names字段
       * @格式[['group', 'item1'], ['group', 'item2']]或['item1', 'item2']
       */
      showList: {
        type: Array
      }
    },
    data () {
      return {
        chart: null
      }
    },
    computed: {
      showListMap () {
        let map = {}
        if (util.isArray(this.showList)) {
          this.showList.forEach(item => {
            if (util.isArray(item)) {
              map[item.join('-')] = true
            } else if (util.isString(item)) {
              map[item] = true
            }
          })
        }
        return map
      },
      style () {
        let style = {
          height: this.height + 'px'
        }
        if (this.width) style.width = `${this.width}px`
        return style
      },
      option () {
        return {
          color: [
            '#00a0e9', '#f4b93b', '#85bd41', '#f29c9f', '#8f82bc',
            '#0068b7', '#f29b76', '#13b5b1', '#ea68a2', '#fff100',
            '#1ec0ff', '#f9a11b', '#8cd790', '#40ccca', '#aaabd3',
            '#2b90d9', '#ec7a4a', '#f29b76', '#ea68a2', '#ffdd38'
          ],
          backgroundColor: 'white',
          grid: {
            width: '90%',
            height: '70%',
            left: '5%',
            right: '5%',
            show: false,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: this.getAxisPointerType(),
              lineStyle: {
                color: '#999',
                width: 2,
                type: 'solid'
              }
            },
            formatter: this.tooltipFormatter
          },
          xAxis: {
            data: this.store.x_axis,
            axisLabel: {
              textStyle: {
                color: '#777'
              }
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          },
          yAxis: {
            splitNumber: 5,
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter (value) {
                if (parseFloat(value) >= 1000) {
                  return util.toThousands((value / 1000).toFixed(1)) + 'k'
                } else {
                  return value
                }
              },
              textStyle: {
                color: '#777'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#ddd',
                width: 1,
                type: 'dotted'
              }
            },
            type: 'value',
            axisLine: {
              show: false
            }
          },
          series: this.getSeries()
        }
      }
    },
    mounted () {
      this.chart = echarts.init(this.$refs.toChart)
      this.chart.setOption(this.option)
    },
    methods: {
      getSeries () {
        switch (this.type) {
          case 'bar':
            return this.getBarSeries()
          case 'line':
            return this.getLineSeries()
          default:
            console.error('未支持的图表类型', this.type)
        }
      },
      getBarSeries () {
        return this.store.series.map(series => {
          const name = series.names.join('-')
          if (util.isArray(this.showList) && !this.showListMap[name]) return
          return {
            name,
            type: 'bar',
            barMaxWidth: 35,
            data: series.values
          }
        })
      },
      getLineSeries () {
        return this.store.series.map(series => {
          const name = series.names.join('-')
          if (util.isArray(this.showList) && !this.showListMap[name]) return
          return {
            name,
            type: 'line',
            data: series.values,
            symbol: 'circle',
            symbolSize: 5,
            showAllSymbol: true,
            itemStyle: {
              normal: {
                lineStyle: {width: 1}
              }
            }
          }
        })
      },
      getAxisPointerType () {
        let type = 'shadow'
        switch (this.type) {
          case 'bar':
            type = 'shadow'
            break
          case 'line':
            type = 'line'
            break
          default:
            console.error('未支持的图表类型', this.type)
        }
        return type
      }
    }
  }
</script>

<style lang="sass">
@import "styles/charts"
</style>
