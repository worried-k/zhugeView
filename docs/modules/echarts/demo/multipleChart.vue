<template>
  <div>
    <demo-panel subtitle="doubleY: line&bar">
      <zg-charts :store="json" doubleY :yAxisRule="yAxisRule"></zg-charts>
    </demo-panel>
  </div>
</template>

<script>
  import json from './json/multiple.json'
  import DemoPanel from '../../../components/demoPanel/index.vue'
  import ZgCharts from '../../../../src/components/echarts/charts.vue'

  export default {
    name: 'multipleChart',
    components: {
      ZgCharts,
      DemoPanel},
    data () {
      return {
        json: json.app_data,
        yAxisRule: {
          '曝光': {
            index: 0,
            type: 'line'
          },
          '点击': {
            index: 1,
            type: 'bar'
          },
          click: {
            index: 1,
            type: 'line'
          }
        }
      }
    }
  }
</script>

<style lang="sass">

</style>
