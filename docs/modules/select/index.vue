<template>
  <div>
    <demo-panel
      title="普通下拉框"
      subtitle="subtitle"
    >
      <zg-select>
        <zg-option
          icon="icon-list"
          label="909"
          value="aaa"
        ></zg-option>
      </zg-select>

      <zg-select>
        <zg-opt-group label="城市">
          <zg-option label="北京"></zg-option>
        </zg-opt-group>
      </zg-select>
    </demo-panel>
  </div>
</template>

<script>

  import ZgOption from "../../../src/components/selector/option.vue";

  export default {
    components: {ZgOption},
    name: 'index',
    data() {
      return {
        msg: 'this is index'
      }
    }
  }
</script>

<style lang="sass">

</style>
