<template>
  <div>
    <bar-chart></bar-chart>
    <line-chart></line-chart>
  </div>
</template>

<script>
  import barChart from './demo/barChart.vue'
  import LineChart from './demo/lineChart.vue'

  export default {
    components: {
      LineChart,
      barChart},
    name: 'index',
    data () {
      return {
        msg: 'index'
      }
    }
  }
</script>

<style lang="sass">

</style>
