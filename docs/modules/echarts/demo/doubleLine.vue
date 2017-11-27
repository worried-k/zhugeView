<template>
  <div>
    <demo-panel subtitle="doubleY: line">
      <zg-charts :store="json" type="line" doubleY :yAxisRule="yAxisRule"></zg-charts>
    </demo-panel>
  </div>
</template>

<script>
  import json from './json/doubleLine.json'
  import DemoPanel from '../../../components/demoPanel/index.vue'
  import ZgCharts from '../../../../src/components/echarts/charts.vue'
//  import {util} from '../../../../src/utils'
//  let arr = []
//  for (let i = 0; i < 27; i++) {
//    arr.push(util.random(0, 50))
//  }
//  console.log(JSON.stringify(arr))
  export default {
    components: {
      ZgCharts,
      DemoPanel},
    name: 'doubleLine',
    data () {
      return {
        json: json.app_data,
        yAxisRule: {
          '曝光': {
            type: 'line',
            index: 0
          },
          '点击': {
            type: 'line',
            index: 1
          }
        }
      }
    }
  }
</script>

<style lang="sass">

</style>
