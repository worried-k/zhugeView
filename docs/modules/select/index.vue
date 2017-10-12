<template>
  <div>
    <demo-panel
      title="普通下拉框"
      subtitle="subtitle"
    >
      <zg-checkbox label="勾选项"></zg-checkbox>
      <zg-select placeholder="全部"
                 multiple
                 filter-option
      >
        <zg-option v-for="item in select1"
          :label="item.label"
          :value="item.value"
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
  import ZgCheckbox from "../../../src/components/checkbox/checkbox.vue";

  export default {
    components: {
      ZgCheckbox,
      ZgOption},
    name: 'index',
    data() {
      let data = {
        select1: (() => {
          let data = []
          for (let i = 0; i < 10; i++) {
            data.push({
              label: `label${i}`,
              value: i
            })
          }
          return data
        })()
      }
      return data
    }
  }
</script>

<style lang="sass">

</style>
