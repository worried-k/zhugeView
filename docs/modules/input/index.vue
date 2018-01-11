<template>
  <div>
    <demo-panel
      title="输入框"
      subtitle="普通输入框"
      jsFiddleName="Lqxvqar4"
    >
      <zg-input icon="zgicon-list"
                clear-able
                placeholder="有清除有icon"
                @blur="onBlur"
                @focus="onFocus"
                v-model="value"></zg-input>
      <span>输入值：{{value}}</span>
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
    },
    methods: {
      onBlur () {
        console.log('on blur')
      },
      onFocus () {
        console.log('on focus')
      }
    }
  }
</script>

<style lang="sass">

</style>
