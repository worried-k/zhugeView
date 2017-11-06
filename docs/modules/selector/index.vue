<template>
  <div>
    <normal-selector></normal-selector>
    <!--<group-selector></group-selector>-->
    <!--<normal-big-data-selector></normal-big-data-selector>-->
    <!--<group-big-data-selector></group-big-data-selector>-->

    <!--<doc-markdown :api="api.select" title="select"></doc-markdown>-->
    <!--<doc-markdown :api="api.bigSelect" title="bigSelect"></doc-markdown>-->
    <!--<doc-markdown :api="api.option" title="option"></doc-markdown>-->
    <!--<doc-markdown :api="api.optGroup" title="optionGroup"></doc-markdown>-->
  </div>
</template>

<script>

  import DocMarkdown from '../../components/docMarkdown/index.vue'

  import NormalSelector from './demo/normalSelector.vue'
  import GroupSelector from './demo/groupSelector.vue'
  import NormalBigDataSelector from './demo/normalBigDataSelector.vue'
  import GroupBigDataSelector from './demo/groupBigDataSelector.vue'

  export default {
    components: {
      GroupBigDataSelector,
      NormalBigDataSelector,
      GroupSelector,
      NormalSelector,
      DocMarkdown},
    name: 'index',
    data() {
      let data = {}
      return data
    }
  }
</script>

<style lang="sass">

</style>
