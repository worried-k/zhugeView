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
  </div>
</template>

<script>
  import DemoPanel from "../../components/demoPanel/index.vue";
  import ZgInput from "../../../src/components/input/input.vue";

  export default {
    components: {
      ZgInput,
      DemoPanel},
    data () {
      return {
        value: ''
      }
    }
  }
</script>

<style lang="sass">

</style>
