<template>
  <div>
    <demo-panel
      title="普通下拉框"
      subtitle="subtitle">

      <zg-checkbox label="勾选项"></zg-checkbox>

      <zg-select placeholder="多选"
                 multiple
                 :width="100"
                 filter-option
                 v-model="value1"
                 theme="noborder"
                 label-field="label">
        <zg-option v-for="item in select1" :value="item"></zg-option>
      </zg-select>

      <zg-select placeholder="单选" label-field="label">
        <zg-option v-for="item in select1" :value="item"></zg-option>
      </zg-select>

      <zg-select placeholder="多选"
                 filter-option
                 multiple
                 label-field="label">
        <zg-opt-group label="城市">
          <zg-option v-for="item in select1" :value="item"></zg-option>
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
              label: `label2121212121@!@121212${i}`,
              value: i
            })
          }
          return data
        })(),
        value1: []
      }
      return data
    }
  }
</script>

<style lang="sass">

</style>
