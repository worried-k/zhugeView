<template>
  <div>
    <demo-panel subtitle="区域图">
      <zg-charts :store="json" type="area"></zg-charts>
    </demo-panel>
  </div>
</template>

<script>
  import json from './json/area.json'
  import ZgCharts from '../../../../src/components/echarts/charts'
  import {util} from '../../../../src/utils'
  export default {
    components: {ZgCharts},
    name: 'areaChart',
    data () {
      let store = json.app_data
      for (let i = 0; i < 3; i++) {
        store.series.push({
          names: ['版本-' + (i + 1)],
          values: []
        })
      }

      store.x_axis.forEach(() => {
        let one = util.random(0, 100)
        let two = util.random(0, 100 - one)
        let three = 100 - one - two
        // let three = util.random(30, 100)
        store.series[0].values.push(one)
        store.series[1].values.push(two)
        store.series[2].values.push(three)
      })
      console.log(util.clone(store))
      return {
        json: store
      }
    }
  }
</script>

<style lang="sass">

</style>
