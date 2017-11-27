<template>
  <div>
    <bar-chart></bar-chart>
    <line-chart></line-chart>
    <double-line></double-line>
    <multiple-chart></multiple-chart>
    <doc-markdown :api="api"></doc-markdown>
  </div>
</template>

<script>
  import barChart from './demo/barChart.vue'
  import LineChart from './demo/lineChart.vue'
  import DocMarkdown from '../../components/docMarkdown/index.vue'
  import api from './charts.json'
  import DoubleLine from './demo/doubleLine.vue'
  import MultipleChart from './demo/multipleChart.vue'

  export default {
    components: {
      MultipleChart,
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
