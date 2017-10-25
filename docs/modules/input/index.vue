<template>
  <div>
    <demo-panel
      title="输入框"
      subtitle="普通输入框"
    >
      <zg-input icon="zgicon-list"
                clear-able
                placeholder="有清除有icon"
                v-model="value"></zg-input>
      <span>输入值：{{value}}</span>

      <zg-input style="margin-left: 15px"
                placeholder="带有清除的输入框"
                clear-able></zg-input>
      <zg-input
        placeholder="普通输入框"
        style="margin-left: 15px"></zg-input>
    </demo-panel>

    <doc-markdown :api="json" title="input"></doc-markdown>
  </div>
</template>

<script>
  import DemoPanel from "../../components/demoPanel/index.vue";
  import ZgInput from "../../../src/components/input/input.vue";
  import json from './input.json'
  import DocMarkdown from '../../components/docMarkdown/index.vue'

  export default {
    components: {
      DocMarkdown,
      ZgInput,
      DemoPanel},
    data () {
      return {
        json,
        value: '默认值'
      }
    }
  }
</script>

<style lang="sass">

</style>
