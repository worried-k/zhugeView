<template>
  <div>
    <normal-selector></normal-selector>
    <group-selector></group-selector>
    <normal-big-data-selector></normal-big-data-selector>
    <group-big-data-selector></group-big-data-selector>

    <!--<doc-markdown :api="api.select" title="select"></doc-markdown>-->
    <!--<doc-markdown :api="api.bigSelect" title="bigSelect"></doc-markdown>-->
    <!--<doc-markdown :api="api.option" title="option"></doc-markdown>-->
    <!--<doc-markdown :api="api.optGroup" title="optionGroup"></doc-markdown>-->
  </div>
</template>

<script>

  import ZgOption from "../../../src/components/selector/option.vue";
  import ZgCheckbox from "../../../src/components/checkbox/checkbox.vue";
  import json from './test.json'
  import ZgBigSelect from '../../../src/components/selector/bigSelect.vue'
  import selectApi from './select.json'
  import DocMarkdown from '../../components/docMarkdown/index.vue'
  import optionJson from './option.json'
  import bigSelectJson from './bigSelect.json'
  import optGroupJson from './optGroup.json'
  import EsSelect from './demo/esSelect.vue'
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
      EsSelect,
      DocMarkdown,
      ZgBigSelect,
      ZgCheckbox,
      ZgOption},
    name: 'index',
    data() {
      let data = {
        api: {
          select: selectApi,
          option: optionJson,
          bigSelect: bigSelectJson,
          optGroup: optGroupJson
        }
      }
      return data
    }
  }
</script>

<style lang="sass">

</style>
