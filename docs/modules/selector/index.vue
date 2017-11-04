<template>
  <div>
    <!--<normal-selector></normal-selector>-->
    <group-selector></group-selector>
    <!--<normal-select></normal-select>-->
    <!--<multiple-select></multiple-select>-->
    <!--<group-select></group-select>-->
    <!--<normal-big-select></normal-big-select>-->
    <!--<group-big-select></group-big-select>-->
    <!--<es-select></es-select>-->

    <doc-markdown :api="api.select" title="select"></doc-markdown>
    <doc-markdown :api="api.bigSelect" title="bigSelect"></doc-markdown>
    <doc-markdown :api="api.option" title="option"></doc-markdown>
    <doc-markdown :api="api.optGroup" title="optionGroup"></doc-markdown>
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
  import NormalSelect from './demo/normalSelect.vue'
  import MultipleSelect from './demo/multipleSelect.vue'
  import GroupSelect from './demo/groupSelect.vue'
  import NormalBigSelect from './demo/normalBigSelect.vue'
  import GroupBigSelect from './demo/groupBigSelect.vue'
  import EsSelect from './demo/esSelect.vue'
  import NormalSelector from './demo/normalSelector.vue'
  import GroupSelector from './demo/groupSelector.vue'

  export default {
    components: {
      GroupSelector,
      NormalSelector,
      EsSelect,
      GroupBigSelect,
      NormalBigSelect,
      GroupSelect,
      MultipleSelect,
      NormalSelect,
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
