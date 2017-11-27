<template>
  <div>
    <!--<bar-chart></bar-chart>-->
    <!--<line-chart></line-chart>-->
    <double-line></double-line>
    <doc-markdown :api="api"></doc-markdown>
  </div>
</template>

<script>
  import barChart from './demo/barChart.vue'
  import LineChart from './demo/lineChart.vue'
  import DocMarkdown from '../../components/docMarkdown/index.vue'
  import api from './charts.json'
  import DoubleLine from './demo/doubleLine.vue'

  export default {
    components: {
      DoubleLine,
      DocMarkdown,
      LineChart,
      barChart},
    name: 'index',
    data () {
      return {
        api
      }
    }
  }
</script>

<style lang="sass">

</style>
